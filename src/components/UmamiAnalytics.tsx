import { useEffect } from 'react';

const SCRIPT_ATTR = 'data-umami-analytics';

/**
 * Loads Umami when VITE_UMAMI_SCRIPT_URL and VITE_UMAMI_WEBSITE_ID are set.
 * Tracks page views and session duration (time on site) with no extra events.
 */
export function UmamiAnalytics() {
  useEffect(() => {
    const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();

    if (!scriptUrl || !websiteId) {
      if (import.meta.env.DEV) {
        console.info('[umami] Skipped — set VITE_UMAMI_SCRIPT_URL and VITE_UMAMI_WEBSITE_ID in .env.local');
      }
      return;
    }

    if (document.querySelector(`script[${SCRIPT_ATTR}]`)) {
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);
    script.setAttribute(SCRIPT_ATTR, 'true');
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
