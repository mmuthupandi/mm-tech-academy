import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, FileText, Database, ShieldAlert, 
  Search, Calendar, Smartphone, Laptop, Tablet, 
  ArrowLeft, RefreshCw, LogOut, CheckCircle, Mail, Phone, User
} from 'lucide-react';
import { fetchAnalyticsData } from '../services/analytics';
import type { PageViewData } from '../services/analytics';
import './AnalyticsDashboard.css';

// Default passcode
const DEFAULT_PASSCODE = "admin2026";

export const AnalyticsDashboard: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  
  // Data states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<{
    pageViews: PageViewData[];
    users: any[];
    studentInquiries: any[];
    enrollments: any[];
    partnerApplications: any[];
    advisorRequests: any[];
    newsletterSubscribers: any[];
  } | null>(null);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<'users' | 'inquiries' | 'enrollments' | 'partners' | 'advisors' | 'newsletter' | 'views'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check local storage for authorization session
  useEffect(() => {
    const authSession = sessionStorage.getItem('mm_analytics_authorized');
    if (authSession === 'true') {
      setIsAuthorized(true);
      loadData();
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPasscode = import.meta.env.VITE_ANALYTICS_PASSCODE || DEFAULT_PASSCODE;
    
    if (passcode === targetPasscode) {
      setIsAuthorized(true);
      sessionStorage.setItem('mm_analytics_authorized', 'true');
      setPassError(null);
      loadData();
    } else {
      setPassError("Invalid passcode. Please try again.");
      setPasscode('');
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsData();
      setAnalyticsData(data);
    } catch (err: any) {
      setError(err.message || "Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSessionLogout = () => {
    sessionStorage.removeItem('mm_analytics_authorized');
    setIsAuthorized(false);
  };

  // Process data helper variables
  const views = analyticsData?.pageViews || [];
  const registeredUsers = analyticsData?.users || [];
  const inquiries = analyticsData?.studentInquiries || [];
  const enrolls = analyticsData?.enrollments || [];
  const partners = analyticsData?.partnerApplications || [];
  const advisors = analyticsData?.advisorRequests || [];
  const subs = analyticsData?.newsletterSubscribers || [];

  // Metrics
  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map(v => v.visitorId)).size;
  const totalSubmissions = inquiries.length + enrolls.length + partners.length + advisors.length + subs.length;
  const totalUsers = registeredUsers.length;

  // Process page view statistics (by path)
  const pageStats: { [path: string]: number } = {};
  views.forEach(v => {
    pageStats[v.path] = (pageStats[v.path] || 0) + 1;
  });
  const topPages = Object.entries(pageStats)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Process referrers
  const referrerStats: { [source: string]: number } = {};
  views.forEach(v => {
    const ref = v.referrer === "Direct" || v.referrer === "" ? "Direct Traffic" : new URL(v.referrer).hostname;
    referrerStats[ref] = (referrerStats[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(referrerStats)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Process device types
  let mobileCount = 0;
  let tabletCount = 0;
  let desktopCount = 0;
  views.forEach(v => {
    if (v.deviceType === 'mobile') mobileCount++;
    else if (v.deviceType === 'tablet') tabletCount++;
    else desktopCount++;
  });
  const totalDeviceCount = mobileCount + tabletCount + desktopCount || 1;
  const devicePercentages = {
    mobile: Math.round((mobileCount / totalDeviceCount) * 100),
    tablet: Math.round((tabletCount / totalDeviceCount) * 100),
    desktop: Math.round((desktopCount / totalDeviceCount) * 100),
  };

  // Group page views by day (last 7 days) for the SVG chart
  const getChartData = () => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const viewsByDay: { [date: string]: number } = {};
    last7Days.forEach(day => { viewsByDay[day] = 0; });

    views.forEach(v => {
      const dateStr = v.timestamp.split('T')[0];
      if (dateStr in viewsByDay) {
        viewsByDay[dateStr]++;
      }
    });

    return last7Days.map(day => {
      const dateObj = new Date(day);
      const label = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      return { label, count: viewsByDay[day] };
    });
  };

  const chartData = getChartData();
  const maxChartCount = Math.max(...chartData.map(d => d.count), 5); // Fallback to min height 5

  // SVG Chart rendering math
  const chartWidth = 500;
  const chartHeight = 180;
  const padding = 30;
  const points = chartData.map((d, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (chartData.length - 1);
    const y = chartHeight - padding - (d.count / maxChartCount) * (chartHeight - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z` 
    : '';

  // Tab Filtering & Query Searches
  const filterList = (list: any[], searchFields: string[]) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase().trim();
    return list.filter(item => 
      searchFields.some(field => String(item[field] || '').toLowerCase().includes(query))
    );
  };

  // Secure Passcode Entry screen
  if (!isAuthorized) {
    return (
      <div className="auth-dashboard-container">
        <a href="/" className="dashboard-back-link">
          <ArrowLeft size={16} /> Back to Academy Website
        </a>
        <div className="dashboard-login-card">
          <div className="dashboard-lock-icon-wrap">
            <Database size={32} color="#fff" />
          </div>
          <h2>Academy Analytics Center</h2>
          <p>This is a secure area. Please enter your passcode to view visitor statistics and database entries.</p>
          
          {passError && (
            <div className="dashboard-auth-error">
              <ShieldAlert size={16} style={{ marginRight: '6px', flexShrink: 0 }} />
              {passError}
            </div>
          )}

          <form onSubmit={handleAuth}>
            <input
              type="password"
              placeholder="Enter passcode (e.g. admin2026)"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              className="dashboard-auth-input"
              required
              autoFocus
            />
            <button type="submit" className="dashboard-auth-submit">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-workspace">
      
      {/* Sidebar/Top Navbar */}
      <header className="dashboard-header">
        <div className="dashboard-title-area">
          <Database size={24} className="dashboard-title-icon" />
          <div>
            <h1>MM TECH ACADEMY</h1>
            <span className="dashboard-subtitle">Visitor Data & Forms Control Panel</span>
          </div>
        </div>
        <div className="dashboard-action-buttons">
          <button onClick={loadData} disabled={loading} className="btn-refresh">
            <RefreshCw size={16} className={loading ? "spin-icon" : ""} /> Refresh
          </button>
          <a href="/" className="btn-go-site">
            <ArrowLeft size={16} /> Site
          </a>
          <button onClick={handleSessionLogout} className="btn-logout" title="Lock Dashboard">
            <LogOut size={16} /> Lock
          </button>
        </div>
      </header>

      {/* Main Workspace Scroll Area */}
      <main className="dashboard-content">
        
        {error && (
          <div className="dashboard-data-error">
            <h3>Failed to synchronize data</h3>
            <p>{error}</p>
            <button onClick={loadData} className="btn-retry">Try Again</button>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && !analyticsData && (
          <div className="dashboard-data-loading">
            <RefreshCw size={48} className="spin-icon text-brand" />
            <p>Loading database data...</p>
          </div>
        )}

        {analyticsData && (
          <>
            {/* 1. Metrics Grid */}
            <div className="metrics-grid">
              
              <div className="metric-card glass-card">
                <div className="metric-icon-wrap bg-blue-glow">
                  <Laptop size={24} color="#60a5fa" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Total Page Views</span>
                  <h3 className="metric-val">{totalViews}</h3>
                </div>
              </div>

              <div className="metric-card glass-card">
                <div className="metric-icon-wrap bg-purple-glow">
                  <Users size={24} color="#c084fc" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Unique Visitors</span>
                  <h3 className="metric-val">{uniqueVisitors}</h3>
                </div>
              </div>

              <div className="metric-card glass-card">
                <div className="metric-icon-wrap bg-emerald-glow">
                  <Users size={24} color="#34d399" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Registered Accounts</span>
                  <h3 className="metric-val">{totalUsers}</h3>
                </div>
              </div>

              <div className="metric-card glass-card">
                <div className="metric-icon-wrap bg-orange-glow">
                  <FileText size={24} color="#fb923c" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Form Submissions</span>
                  <h3 className="metric-val">{totalSubmissions}</h3>
                </div>
              </div>

            </div>

            {/* 2. Visual Graphs & Breakdown Charts */}
            <div className="charts-row">
              
              {/* Chart A: Views over Time (Line Chart) */}
              <div className="chart-card glass-card">
                <div className="chart-header">
                  <TrendingUp size={18} color="#FF6B00" />
                  <h4>Visitor Traffic History (7 Days)</h4>
                </div>
                <div className="chart-body">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="svg-line-chart">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                      const y = padding + r * (chartHeight - padding * 2);
                      const count = Math.round(maxChartCount * (1 - r));
                      return (
                        <g key={i}>
                          <line 
                            x1={padding} 
                            y1={y} 
                            x2={chartWidth - padding} 
                            y2={y} 
                            stroke="rgba(255,255,255,0.06)" 
                            strokeWidth={1}
                          />
                          <text 
                            x={padding - 8} 
                            y={y + 4} 
                            fill="rgba(255,255,255,0.4)" 
                            fontSize={9} 
                            textAnchor="end"
                          >
                            {count}
                          </text>
                        </g>
                      );
                    })}

                    {/* Area fill */}
                    {areaPath && (
                      <path 
                        d={areaPath} 
                        fill="url(#chartAreaGradient)"
                        opacity={0.15}
                      />
                    )}

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6B00" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>

                    {/* Line path */}
                    {linePath && (
                      <path 
                        d={linePath} 
                        fill="none" 
                        stroke="#FF6B00" 
                        strokeWidth={2.5} 
                        strokeLinecap="round"
                      />
                    )}

                    {/* Chart Points circles */}
                    {points.map((p, i) => (
                      <g key={i} className="chart-point-group">
                        <circle 
                          cx={p.x} 
                          cy={p.y} 
                          r={4.5} 
                          fill="#FF6B00" 
                          stroke="#1a0800" 
                          strokeWidth={1.5}
                        />
                        <text
                          x={p.x}
                          y={p.y - 10}
                          fill="#fff"
                          fontSize={10}
                          fontWeight="bold"
                          textAnchor="middle"
                          className="chart-point-label"
                        >
                          {p.count}
                        </text>
                        {/* Day Label on X Axis */}
                        <text
                          x={p.x}
                          y={chartHeight - padding + 16}
                          fill="rgba(255,255,255,0.5)"
                          fontSize={9}
                          textAnchor="middle"
                        >
                          {p.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Chart B: Devices & Top Pages */}
              <div className="chart-card glass-card">
                <div className="chart-header">
                  <Smartphone size={18} color="#34d399" />
                  <h4>Visitor Device Breakdown</h4>
                </div>
                <div className="device-breakdown-body">
                  <div className="device-bar-total">
                    <div style={{ width: `${devicePercentages.desktop}%`, background: '#60a5fa' }} title="Desktop" />
                    <div style={{ width: `${devicePercentages.mobile}%`, background: '#34d399' }} title="Mobile" />
                    <div style={{ width: `${devicePercentages.tablet}%`, background: '#c084fc' }} title="Tablet" />
                  </div>
                  
                  <div className="device-legends">
                    <div className="device-legend-item">
                      <Laptop size={16} color="#60a5fa" />
                      <div>
                        <span className="device-type-name">Desktop</span>
                        <span className="device-type-val">{devicePercentages.desktop}% ({desktopCount})</span>
                      </div>
                    </div>
                    <div className="device-legend-item">
                      <Smartphone size={16} color="#34d399" />
                      <div>
                        <span className="device-type-name">Mobile</span>
                        <span className="device-type-val">{devicePercentages.mobile}% ({mobileCount})</span>
                      </div>
                    </div>
                    <div className="device-legend-item">
                      <Tablet size={16} color="#c084fc" />
                      <div>
                        <span className="device-type-name">Tablet</span>
                        <span className="device-type-val">{devicePercentages.tablet}% ({tabletCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="divider-h" />

                  <div className="top-pages-list">
                    <h5>Most Visited Pages</h5>
                    <div className="top-pages-rows">
                      {topPages.map((page, index) => (
                        <div key={index} className="top-page-row">
                          <span className="page-path-text">{page.path}</span>
                          <span className="page-views-badge">{page.count} views</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="top-pages-list" style={{ marginTop: '1.25rem' }}>
                    <h5>Top Traffic Referrers</h5>
                    <div className="top-pages-rows">
                      {topReferrers.map((ref, index) => (
                        <div key={index} className="top-page-row">
                          <span className="page-path-text" style={{ color: '#c084fc' }}>{ref.source}</span>
                          <span className="page-views-badge">{ref.count} hits</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* 3. Database Table Center */}
            <div className="database-section glass-card">
              
              {/* Tab Header Controls */}
              <div className="tab-control-bar">
                <div className="tab-buttons">
                  <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
                  >
                    Registered Users ({totalUsers})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('inquiries'); setSearchQuery(''); }}
                  >
                    Student Inquiries ({inquiries.length})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'enrollments' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('enrollments'); setSearchQuery(''); }}
                  >
                    Enrollments ({enrolls.length})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('partners'); setSearchQuery(''); }}
                  >
                    Partners ({partners.length})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'advisors' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('advisors'); setSearchQuery(''); }}
                  >
                    Advisor Requests ({advisors.length})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'newsletter' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('newsletter'); setSearchQuery(''); }}
                  >
                    Subscribers ({subs.length})
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'views' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('views'); setSearchQuery(''); }}
                  >
                    Real-time Traffic ({totalViews})
                  </button>
                </div>

                {/* Database Search Filter */}
                <div className="tab-search-wrap">
                  <Search size={16} color="rgba(255,255,255,0.4)" />
                  <input
                    type="text"
                    placeholder={`Search this collection...`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="tab-search-input"
                  />
                </div>
              </div>

              {/* Data Table Display */}
              <div className="table-responsive-container">
                {activeTab === 'users' && (() => {
                  const filtered = filterList(registeredUsers, ['name', 'email', 'phone']);
                  if (filtered.length === 0) return <div className="no-records">No users registered yet.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email Address</th>
                          <th>Phone Number</th>
                          <th>Registered Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><User size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} /> {item.name}</td>
                            <td><Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline', color: '#60a5fa' }} /> {item.email}</td>
                            <td><Phone size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline', color: '#34d399' }} /> {item.phone}</td>
                            <td><Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline' }} /> {new Date(item.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'inquiries' && (() => {
                  const filtered = filterList(inquiries, ['name', 'email', 'phone', 'course']);
                  if (filtered.length === 0) return <div className="no-records">No inquiries found.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Email Address</th>
                          <th>Phone</th>
                          <th>Course of Interest</th>
                          <th>Date Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><User size={14} style={{ marginRight: '6px', display: 'inline' }} />{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td><span className="course-pill bg-blue-pill">{item.course}</span></td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'enrollments' && (() => {
                  const filtered = filterList(enrolls, ['name', 'email', 'phone', 'course', 'message']);
                  if (filtered.length === 0) return <div className="no-records">No enrollments recorded yet.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Target Course</th>
                          <th>Message/Requirements</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><User size={14} style={{ marginRight: '6px', display: 'inline' }} />{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td><span className="course-pill bg-purple-pill">{item.course}</span></td>
                            <td className="cell-message" title={item.message}>{item.message || "-"}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'partners' && (() => {
                  const filtered = filterList(partners, ['name', 'email', 'phone', 'company', 'message']);
                  if (filtered.length === 0) return <div className="no-records">No partnership requests found.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Contact Person</th>
                          <th>Company / Inst.</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Partnership Proposal</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><User size={14} style={{ marginRight: '6px', display: 'inline' }} />{item.name}</td>
                            <td className="text-indigo-400 font-semibold">{item.company}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className="cell-message" title={item.message}>{item.message || "-"}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'advisors' && (() => {
                  const filtered = filterList(advisors, ['name', 'email', 'phone', 'advisor', 'notes']);
                  if (filtered.length === 0) return <div className="no-records">No advisor requests found.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Inquirer</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Advisor Requested</th>
                          <th>Notes</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><User size={14} style={{ marginRight: '6px', display: 'inline' }} />{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className="text-orange-400 font-semibold">{item.advisor}</td>
                            <td className="cell-message" title={item.notes}>{item.notes || "-"}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'newsletter' && (() => {
                  const filtered = filterList(subs, ['email']);
                  if (filtered.length === 0) return <div className="no-records">No subscribers recorded.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Subscriber Email</th>
                          <th>Subscribed Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td className="font-semibold text-brand"><Mail size={14} style={{ marginRight: '8px', display: 'inline' }} /> {item.email}</td>
                            <td><Calendar size={14} style={{ marginRight: '8px', display: 'inline' }} /> {new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}

                {activeTab === 'views' && (() => {
                  const filtered = filterList(views, ['path', 'userName', 'userEmail', 'browser', 'os', 'referrer']);
                  if (filtered.length === 0) return <div className="no-records">No visitor activity tracked yet.</div>;
                  return (
                    <table className="db-table">
                      <thead>
                        <tr>
                          <th>Viewer Profile</th>
                          <th>Page Path</th>
                          <th>Device / OS</th>
                          <th>Browser</th>
                          <th>Referrer Source</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => (
                          <tr key={item.id}>
                            <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.userName ? (
                                <div>
                                  <span className="font-semibold text-brand"><CheckCircle size={12} style={{ color: '#34d399', marginRight: '4px', verticalAlign: 'middle', display: 'inline' }} /> {item.userName}</span>
                                  <span className="user-email-sub text-slate-400 block" style={{ fontSize: '0.75rem' }}>{item.userEmail}</span>
                                </div>
                              ) : (
                                <span className="visitor-id-sub text-slate-500 font-semibold" style={{ fontSize: '0.8rem' }} title={item.visitorId}>
                                  Anonymous ({item.visitorId.substring(0, 10)}...)
                                </span>
                              )}
                            </td>
                            <td className="font-mono text-indigo-300" style={{ fontSize: '0.85rem' }}>{item.path}</td>
                            <td>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                {item.deviceType === 'mobile' ? <Smartphone size={13} /> : item.deviceType === 'tablet' ? <Tablet size={13} /> : <Laptop size={13} />}
                                {item.os}
                              </span>
                            </td>
                            <td>{item.browser}</td>
                            <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.referrer}>{item.referrer}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
};
