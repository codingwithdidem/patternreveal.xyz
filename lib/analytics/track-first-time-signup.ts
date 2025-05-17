import posthog from "posthog-js";

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        user_id?: string;
        email?: string;
        name?: string;
        timestamp?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

export const trackFirstTimeSignup = (
  userId: string,
  email: string,
  name: string
) => {
  // Track in PostHog
  posthog.capture("first_time_signup", {
    distinct_id: userId,
    email,
    name,
    timestamp: new Date().toISOString()
  });

  // Track in Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "first_time_signup", {
      user_id: userId,
      email,
      name,
      timestamp: new Date().toISOString()
    });
  }
};
