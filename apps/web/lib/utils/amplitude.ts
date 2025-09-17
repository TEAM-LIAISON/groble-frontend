/**
 * Amplitude Analytics Utility Functions
 *
 * This module provides TypeScript-safe utility functions for tracking events
 * with Amplitude analytics. All functions include proper error handling and
 * type safety.
 *
 * ## Environment Variables
 *
 * Add the following to your .env.local file:
 * ```
 * NEXT_PUBLIC_AMPLITUDE_API_KEY=your_amplitude_api_key_here
 * ```
 *
 * If not provided, it will fall back to the hardcoded API key in HeadTags.tsx
 *
 * ## Usage Examples
 *
 * ```typescript
 * import { trackEvent, amplitudeEvents } from '@/lib/utils/amplitude';
 *
 * // Track a custom event
 * trackEvent('Custom Event', { property1: 'value1' });
 *
 * // Track common events
 * amplitudeEvents.pageView('Home Page');
 * amplitudeEvents.buttonClick('Sign Up Button', 'header');
 * amplitudeEvents.purchase('product-123', 29.99, 'USD');
 * ```
 */

// Check if Amplitude is available
const isAmplitudeAvailable = (): boolean => {
  return typeof window !== "undefined" && window.amplitude != null;
};

/**
 * Track an event with Amplitude
 * @param eventName - The name of the event to track
 * @param eventProperties - Optional properties to include with the event
 */
export const trackEvent = (
  eventName: string,
  eventProperties?: Record<string, unknown>
): void => {
  if (!isAmplitudeAvailable()) {
    console.warn("Amplitude is not available. Event not tracked:", eventName);
    return;
  }

  try {
    window.amplitude.track(eventName, eventProperties);
  } catch (error) {
    console.error("Failed to track Amplitude event:", error);
  }
};

/**
 * Identify a user with Amplitude
 * @param userId - The unique identifier for the user
 * @param userProperties - Optional user properties to set
 */
export const identifyUser = (
  userId: string,
  userProperties?: Record<string, unknown>
): void => {
  if (!isAmplitudeAvailable()) {
    console.warn("Amplitude is not available. User not identified:", userId);
    return;
  }

  try {
    window.amplitude.identify(userId, userProperties);
  } catch (error) {
    console.error("Failed to identify user with Amplitude:", error);
  }
};

/**
 * Set user ID for Amplitude
 * @param userId - The unique identifier for the user
 */
export const setUserId = (userId: string): void => {
  if (!isAmplitudeAvailable()) {
    console.warn("Amplitude is not available. User ID not set:", userId);
    return;
  }

  try {
    window.amplitude.setUserId(userId);
  } catch (error) {
    console.error("Failed to set user ID with Amplitude:", error);
  }
};

/**
 * Set user properties for Amplitude
 * @param userProperties - Properties to set for the current user
 */
export const setUserProperties = (
  userProperties: Record<string, unknown>
): void => {
  if (!isAmplitudeAvailable()) {
    console.warn(
      "Amplitude is not available. User properties not set:",
      userProperties
    );
    return;
  }

  try {
    window.amplitude.setUserProperties(userProperties);
  } catch (error) {
    console.error("Failed to set user properties with Amplitude:", error);
  }
};

/**
 * Reset Amplitude user data
 */
export const resetUser = (): void => {
  if (!isAmplitudeAvailable()) {
    console.warn("Amplitude is not available. User not reset");
    return;
  }

  try {
    window.amplitude.reset();
  } catch (error) {
    console.error("Failed to reset user with Amplitude:", error);
  }
};

/**
 * Common event tracking functions for frequently used events
 */
export const amplitudeEvents = {
  /**
   * Track page view
   * @param pageName - Name of the page being viewed
   * @param additionalProperties - Additional properties to include
   */
  pageView: (
    pageName: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    trackEvent("Page View", {
      page_name: pageName,
      ...additionalProperties,
    });
  },

  /**
   * Track button click
   * @param buttonName - Name/identifier of the button clicked
   * @param location - Location where the button was clicked
   * @param additionalProperties - Additional properties to include
   */
  buttonClick: (
    buttonName: string,
    location?: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    trackEvent("Button Click", {
      button_name: buttonName,
      location,
      ...additionalProperties,
    });
  },

  /**
   * Track form submission
   * @param formName - Name/identifier of the form
   * @param additionalProperties - Additional properties to include
   */
  formSubmit: (
    formName: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    trackEvent("Form Submit", {
      form_name: formName,
      ...additionalProperties,
    });
  },

  /**
   * Track purchase/transaction
   * @param productId - ID of the product purchased
   * @param amount - Amount of the purchase
   * @param currency - Currency of the purchase
   * @param additionalProperties - Additional properties to include
   */
  purchase: (
    productId: string,
    amount: number,
    currency = "KRW",
    additionalProperties?: Record<string, unknown>
  ) => {
    trackEvent("Purchase", {
      product_id: productId,
      amount,
      currency,
      ...additionalProperties,
    });
  },

  /**
   * Track user sign up
   * @param method - Sign up method (email, social, etc.)
   * @param additionalProperties - Additional properties to include
   */
  signUp: (method: string, additionalProperties?: Record<string, unknown>) => {
    trackEvent("Sign Up", {
      method,
      ...additionalProperties,
    });
  },

  /**
   * Track user sign in
   * @param method - Sign in method (email, social, etc.)
   * @param additionalProperties - Additional properties to include
   */
  signIn: (method: string, additionalProperties?: Record<string, unknown>) => {
    trackEvent("Sign In", {
      method,
      ...additionalProperties,
    });
  },
};
