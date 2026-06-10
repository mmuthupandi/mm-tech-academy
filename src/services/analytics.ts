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

const PAGE_VIEWS_COLLECTION = "mock_page_views";

const parseUserAgent = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  const width = window.innerWidth;
  if (width < 768 || /Mobi|Android|iPhone|iPod/i.test(ua)) {
    deviceType = 'mobile';
  } else if (width >= 768 && width < 1024 || /iPad|Tablet|PlayBook|Silk/i.test(ua)) {
    deviceType = 'tablet';
  }

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

export const trackPageView = async (path: string): Promise<void> => {
  try {
    let visitorId = localStorage.getItem("mm_analytics_visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem("mm_analytics_visitor_id", visitorId);
    }

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

    const views = JSON.parse(localStorage.getItem(PAGE_VIEWS_COLLECTION) || "[]");
    views.push({ id: "pv_" + Date.now(), ...pageView });
    localStorage.setItem(PAGE_VIEWS_COLLECTION, JSON.stringify(views));
  } catch (e) {
    console.error("Error in analytics tracking: ", e);
  }
};

export const fetchAnalyticsData = async (): Promise<any> => {
  const fetchCollection = (colName: string): any[] => {
    return JSON.parse(localStorage.getItem(`mock_${colName}`) || "[]");
  };

  try {
    const pageViews: PageViewData[] = fetchCollection("page_views");
    pageViews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const users = fetchCollection("users");
    const studentInquiries = fetchCollection("student_inquiries");
    const enrollments = fetchCollection("enrollments");
    const partnerApplications = fetchCollection("partner_applications");
    const advisorRequests = fetchCollection("advisor_requests");
    const newsletterSubscribers = fetchCollection("newsletter_subscribers");

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
