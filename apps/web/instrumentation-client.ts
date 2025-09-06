// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import {
  sendDiscordWebhook,
  formatSentryErrorForDiscord,
} from "./lib/discord-webhook";

interface UserStorage {
  state: {
    user: {
      isLogin: boolean;
      nickname: string;
      email: string;
      profileImageUrl: string;
      canSwitchToSeller: boolean;
      unreadNotificationCount: number;
      alreadyRegisteredAsSeller: boolean;
      lastUserType: string;
    };
    lastUpdated: number;
  };
  version: number;
}

function getUserFromLocalStorage(): UserStorage["state"]["user"] | null {
  try {
    const userStorageStr = localStorage.getItem("user-storage");
    if (!userStorageStr) {
      return null;
    }

    const userStorage: UserStorage = JSON.parse(userStorageStr);

    // 로그인 상태 확인
    if (!userStorage.state?.user?.isLogin) {
      return null;
    }

    return userStorage.state.user;
  } catch (error) {
    console.warn("Failed to get user from localStorage:", error);
    return null;
  }
}

Sentry.init({
  dsn: "https://874ef5c732f02f6d3ee9a9800cfac941@o4509948666052608.ingest.us.sentry.io/4509948669722625",

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  beforeSend(event, hint) {
    console.log("Client error captured:", event);

    const localUser = getUserFromLocalStorage();

    // Add client-specific context and send to Discord
    const enhancedEvent = {
      ...event,
      event_id: event.event_id || `client-${Date.now()}`,
      platform: "javascript",
      environment: process.env.NODE_ENV,
      timestamp: Math.floor(Date.now() / 1000),
      contexts: {
        ...event.contexts,
        runtime: {
          name: "browser",
          version: navigator.userAgent,
        },
        browser: {
          name: navigator.userAgent.split(" ")[0] || "Unknown",
          version: navigator.userAgent,
        },
        os: {
          name: navigator.platform,
        },
        ...(localUser && {
          localUser: {
            nickname: localUser.nickname,
            email: localUser.email,
            lastUserType: localUser.lastUserType,
            canSwitchToSeller: localUser.canSwitchToSeller,
            alreadyRegisteredAsSeller: localUser.alreadyRegisteredAsSeller,
          },
        }),
      },
      tags: [
        ...(Array.isArray(event.tags) ? event.tags : []),
        ["environment", process.env.NODE_ENV || "development"],
        ["runtime", "client"],
        ["url", window.location.href],
        ...(localUser
          ? [
              ["local_user_nickname", localUser.nickname],
              ["local_user_type", localUser.lastUserType],
            ]
          : []),
      ],
      request: {
        ...event.request,
        url: window.location.href,
        headers: {
          "User-Agent": navigator.userAgent,
          Referer: document.referrer,
        },
      },
    };

    console.log(
      "Sending client error to Discord:",
      JSON.stringify(enhancedEvent, null, 2)
    );

    const discordPayload = formatSentryErrorForDiscord(
      enhancedEvent,
      hint as Record<string, unknown>
    );
    sendDiscordWebhook(discordPayload).catch((error) => {
      console.error("Failed to send Discord webhook for client error:", error);
    });

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
