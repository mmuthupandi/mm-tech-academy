import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getCurrentUser } from "./auth";

export interface PageViewData {
  id?: string;
  path: string;
  timestamp: string;
  visitorId: string;
  sessionId: string;
  referrer: string;
  screenResolution: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  userEmail?: string;
  userName?: string;
}

const PAGE_VIEWS_COLLECTION = "page_views";

/**
 * Parse user agent to extract browser, OS, and device type.
 */
const parseUserAgent = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  // Device detection
  const width = window.innerWidth;
  if (width < 768 || /Mobi|Android|iPhone|iPod/i.test(ua)) {
    deviceType = 'mobile';
  } else if (width >= 768 && width < 1024 || /iPad|Tablet|PlayBook|Silk/i.test(ua)) {
    deviceType = 'tablet';
  }

  // Browser detection
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr|opera/i.test(ua)) {
    browser = "Google Chrome";
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = "Safari";
  } else if (/firefox|fxios/i.test(ua)) {
    browser = "Mozilla Firefox";
  } else if (/edge|edg/i.test(ua)) {
    browser = "Microsoft Edge";
  } else if (/opr|opera/i.test(ua)) {
    browser = "Opera";
  }

  // OS detection
  if (/windows/i.test(ua)) {
    os = "Windows";
  } else if (/macintosh|mac os x/i.test(ua) && !/iphone|ipad|ipod/i.test(ua)) {
    os = "macOS";
  } else if (/android/i.test(ua)) {
    os = "Android";
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = "iOS";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  return { browser, os, deviceType };
};

/**
 * Track a page view and save details to Firestore.
 */
export const trackPageView = async (path: string): Promise<void> => {
  try {
    // Generate or retrieve persistent visitor ID (survives browser close)
    let visitorId = localStorage.getItem("mm_analytics_visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem("mm_analytics_visitor_id", visitorId);
    }

    // Generate or retrieve session ID (cleared on browser close)
    let sessionId = sessionStorage.getItem("mm_analytics_session_id");
    if (!sessionId) {
      sessionId = "session_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("mm_analytics_session_id", sessionId);
    }

    const { browser, os, deviceType } = parseUserAgent();
    const currentUser = getCurrentUser();

    const pageView: PageViewData = {
      path,
      timestamp: new Date().toISOString(),
      visitorId,
      sessionId,
      referrer: document.referrer || "Direct",
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      deviceType,
      browser,
      os,
      ...(currentUser && {
        userEmail: currentUser.email,
        userName: currentUser.name
      })
    };

    // Save to Firestore asynchronously (non-blocking)
    addDoc(collection(db, PAGE_VIEWS_COLLECTION), pageView).catch(err => {
      console.warn("Firestore logging failed in background: ", err);
    });
  } catch (e) {
    console.error("Error in analytics tracking: ", e);
  }
};

/**
 * Fetch all analytics data and forms submissions for the dashboard.
 */
export const fetchAnalyticsData = async (): Promise<{
  pageViews: PageViewData[];
  users: any[];
  studentInquiries: any[];
  enrollments: any[];
  partnerApplications: any[];
  advisorRequests: any[];
  newsletterSubscribers: any[];
}> => {
  const fetchCollection = async (colName: string): Promise<any[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, colName));
      const list: any[] = [];
      querySnapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      return list;
    } catch (e) {
      console.error(`Error fetching collection ${colName}: `, e);
      return [];
    }
  };

  try {
    const pageViewsSnapshot = await getDocs(query(collection(db, PAGE_VIEWS_COLLECTION)));
    const pageViews: PageViewData[] = [];
    pageViewsSnapshot.forEach(doc => {
      pageViews.push({ id: doc.id, ...(doc.data() as PageViewData) });
    });

    // Sort pageViews by timestamp descending
    pageViews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Fetch form data parallelly
    const [
      users,
      studentInquiries,
      enrollments,
      partnerApplications,
      advisorRequests,
      newsletterSubscribers
    ] = await Promise.all([
      fetchCollection("users"),
      fetchCollection("student_inquiries"),
      fetchCollection("enrollments"),
      fetchCollection("partner_applications"),
      fetchCollection("advisor_requests"),
      fetchCollection("newsletter_subscribers")
    ]);

    // Sort all arrays by timestamp/createdAt descending
    const sortByTime = (arr: any[], key = "timestamp") => {
      return arr.sort((a, b) => new Date(b[key] || 0).getTime() - new Date(a[key] || 0).getTime());
    };

    return {
      pageViews,
      users: sortByTime(users, "createdAt"),
      studentInquiries: sortByTime(studentInquiries),
      enrollments: sortByTime(enrollments),
      partnerApplications: sortByTime(partnerApplications),
      advisorRequests: sortByTime(advisorRequests),
      newsletterSubscribers: sortByTime(newsletterSubscribers)
    };
  } catch (error) {
    console.error("Error fetching dashboard analytics data: ", error);
    throw error;
  }
};
