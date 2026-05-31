import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analytics';

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Record page view on path changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Record again when auth changes so the session links with the user identity
  useEffect(() => {
    const handleAuthChange = () => {
      trackPageView(location.pathname + location.search);
    };
    window.addEventListener('auth-changed', handleAuthChange);
    return () => window.removeEventListener('auth-changed', handleAuthChange);
  }, [location]);

  return null;
};
