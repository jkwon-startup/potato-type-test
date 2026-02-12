declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    });
  }
  // 개발 환경에서는 콘솔에 로깅
  if (import.meta.env.DEV) {
    console.log(`[GA4] ${eventName}`, params);
  }
}
