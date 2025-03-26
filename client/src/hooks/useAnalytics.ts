import { useCallback, useEffect } from 'react';
import { useLocation } from 'wouter';
import { v4 as uuidv4 } from 'uuid';

// Generate a session ID when the hook is first loaded
const sessionId = uuidv4();

interface TrackEventParams {
  eventType: string;
  metadata?: Record<string, any>;
}

export function useAnalytics() {
  const [location] = useLocation();

  const trackEvent = useCallback(async ({ eventType, metadata = {} }: TrackEventParams) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          path: location,
          metadata,
          sessionId,
        }),
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, [location]);

  // Track page views automatically
  useEffect(() => {
    trackEvent({ eventType: 'pageview' });
  }, [location, trackEvent]);

  return { trackEvent };
}
