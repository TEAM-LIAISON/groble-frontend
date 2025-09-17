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
 * // Track a custom event (async)
 * await trackEvent('Custom Event', { property1: 'value1' });
 *
 * // Track common events (async)
 * await amplitudeEvents.pageView('Home Page');
 * await amplitudeEvents.buttonClick('Sign Up Button', 'header');
 * await amplitudeEvents.purchase('product-123', 29.99, 'USD');
 * ```
 */

// Check if Amplitude is available
const isAmplitudeAvailable = (): boolean => {
  return (
    typeof window !== "undefined" &&
    window.amplitude != null &&
    typeof window.amplitude.track === "function"
  );
};

// Wait for Amplitude to be available
const waitForAmplitude = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isAmplitudeAvailable()) {
      resolve();
      return;
    }

    const maxAttempts = 50; // 5초 대기 (100ms * 50)
    let attempts = 0;

    const checkAmplitude = () => {
      attempts++;

      if (isAmplitudeAvailable()) {
        resolve();
      } else if (attempts >= maxAttempts) {
        reject(new Error("Amplitude failed to load within timeout"));
      } else {
        setTimeout(checkAmplitude, 100);
      }
    };

    checkAmplitude();
  });
};

/**
 * Track an event with Amplitude
 * @param eventName - The name of the event to track
 * @param eventProperties - Optional properties to include with the event
 */
export const trackEvent = async (
  eventName: string,
  eventProperties?: Record<string, unknown>
): Promise<void> => {
  try {
    await waitForAmplitude();
    window.amplitude.track(eventName, eventProperties);
  } catch (error) {
    console.warn(
      "Amplitude is not available. Event not tracked:",
      eventName,
      error
    );
  }
};

/**
 * Identify a user with Amplitude
 * @param userId - The unique identifier for the user
 * @param userProperties - Optional user properties to set
 */
export const identifyUser = async (
  userId: string,
  userProperties?: Record<string, unknown>
): Promise<void> => {
  try {
    await waitForAmplitude();
    window.amplitude.identify(userId, userProperties);
  } catch (error) {
    console.warn(
      "Amplitude is not available. User not identified:",
      userId,
      error
    );
  }
};

/**
 * Set user ID for Amplitude
 * @param userId - The unique identifier for the user
 */
export const setUserId = async (userId: string): Promise<void> => {
  try {
    await waitForAmplitude();
    window.amplitude.setUserId(userId);
  } catch (error) {
    console.warn("Amplitude is not available. User ID not set:", userId, error);
  }
};

/**
 * Set user properties for Amplitude
 * @param userProperties - Properties to set for the current user
 */
export const setUserProperties = async (
  userProperties: Record<string, unknown>
): Promise<void> => {
  try {
    await waitForAmplitude();
    window.amplitude.setUserProperties(userProperties);
  } catch (error) {
    console.warn(
      "Amplitude is not available. User properties not set:",
      userProperties,
      error
    );
  }
};

/**
 * Reset Amplitude user data
 */
export const resetUser = async (): Promise<void> => {
  try {
    await waitForAmplitude();
    window.amplitude.reset();
  } catch (error) {
    console.warn("Amplitude is not available. User not reset", error);
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
  pageView: async (
    pageName: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Page View", {
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
  buttonClick: async (
    buttonName: string,
    location?: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Button Click", {
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
  formSubmit: async (
    formName: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Form Submit", {
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
  purchase: async (
    productId: string,
    amount: number,
    currency = "KRW",
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Purchase", {
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
  signUp: async (
    method: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Sign Up", {
      method,
      ...additionalProperties,
    });
  },

  /**
   * Track user sign in
   * @param method - Sign in method (email, social, etc.)
   * @param additionalProperties - Additional properties to include
   */
  signIn: async (
    method: string,
    additionalProperties?: Record<string, unknown>
  ) => {
    await trackEvent("Sign In", {
      method,
      ...additionalProperties,
    });
  },
};
