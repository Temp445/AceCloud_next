// src/lib/google/ads.ts

const AD_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag: (...args: any[]) => void;
  }
}

export const initGoogleAds = (): void => {
  if (!AD_ID) {
    console.warn('Google Ads ID is not defined.');
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${AD_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', AD_ID);
  };
};

export const trackConversion = (options?: {
  event?: string;           // 👈 dynamic event name
  form_id?: string;
  form_name?: string;
}): void => {
  const event = options?.event ?? 'conversion'; // default to 'conversion'
  const form_id = options?.form_id ?? '1.0';
  const form_name = options?.form_name ?? 'Default Form';

  if (!window.gtag || !AD_ID || !CONVERSION_LABEL) {
    console.warn('Google Ads tracking is not initialized or missing config.');
    return;
  }

  window.gtag('event', event, {
    send_to: `${AD_ID}/${CONVERSION_LABEL}`,
    form_id,
    form_name,
  });

  console.log('Google Ads conversion event fired');
};
