
import * as parser from "./sentry-parser";


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

interface DiscordWebhookPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    timestamp?: string;
    footer?: {
      text: string;
      icon_url?: string;
    };
    author?: {
      name: string;
      icon_url?: string;
    };
    url?: string;
  }>;
}

export async function sendDiscordWebhook(
  payload: DiscordWebhookPayload
): Promise<void> {

  if (process.env.NODE_ENV !== "production") {
    console.log("Discord webhook skipped - not in production environment");

    return;
  }

  const webhookUrl =

    "https://discord.com/api/webhooks/1413156570086506587/wwEDp_4aJ84YC6fzbomnjq-DnHGz-4jQUT7CeBIE3D5M5DI1jml5-905rtf7QiRz9StN";

  if (!webhookUrl) {
    console.warn("DISCORD_WEBHOOK_URL environment variable is not set");

    return;
  }

  try {
    const response = await fetch(webhookUrl, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Discord webhook failed with status ${response.status}:`,
        errorText
      );
    } else {

      console.log("Discord webhook sent successfully");
    }
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);

  }
}

function cap(str: string, length: number) {
  if (str == null || str?.length <= length) {
    return str;
  }
  return `${str.substr(0, length - 1)}…`;
}


function getUserFromLocalStorage(): UserStorage["state"]["user"] | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const userStorageStr = localStorage.getItem("user-storage");

    if (!userStorageStr) {
      return null;
    }

    const userStorage: UserStorage = JSON.parse(userStorageStr);

    if (!userStorage.state?.user?.isLogin) {
      return null;
    }

    return userStorage.state.user;
  } catch (error) {

    console.warn("Failed to get user from localStorage:", error);

    return null;
  }
}

function createBaseEmbed(
  eventTitle: string,
  eventLevel: string,
  eventTime: Date,
  eventLink: string
) {
  return {
    title: cap(eventTitle, 250),

    description: "",
    color: parser.getColor(eventLevel || "error"),
    author: {
      name: "센트리 알림",
      icon_url: "https://sentrydiscord.dev/icons/sentry.png",
    },
    footer: {
      text: "에러 났는데, 빨리 안 봐?",
      icon_url: "https://sentrydiscord.dev/icons/sentry.png",
    },
    timestamp: eventTime.toISOString(),
    url:
      eventLink.startsWith("https://") || eventLink.startsWith("http://")

        ? eventLink
        : undefined,
  };
}

function buildDescriptionText(
  eventLevel: string,
  sentryEvent: Record<string, unknown>,
  eventFileLocation: string | null
) {

  let descriptionText = "";

  descriptionText += `> **${eventLevel?.toUpperCase()}** ${
    sentryEvent.environment ? `on ${sentryEvent.environment}` : ""

  }\n\n`;

  if (eventFileLocation) {
    descriptionText += `📄 **File:** \`${cap(eventFileLocation, 100)}\`\n\n`;
  }

  return descriptionText;
}

function buildBasicFields(
  sentryEvent: Record<string, unknown>,
  eventPlatform: string
) {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  const request = sentryEvent.request as { url?: string } | undefined;
  if (request?.url) {
    fields.push({

      name: "📍 URL",

      value: cap(request.url, 200),
      inline: false,
    });
  }

  const exception = sentryEvent.exception as
    | { values?: Array<{ type?: string }> }
    | undefined;
  const errorType = exception?.values?.[0]?.type;
  if (errorType) {
    fields.push({

      name: "🔍 Error Type",

      value: errorType,
      inline: true,
    });
  }

  fields.push({

    name: "🏷️ Environment",
    value: (sentryEvent.environment as string) || "Unknown",

    inline: true,
  });

  fields.push({

    name: "📱 Platform",
    value: eventPlatform || "Unknown",

    inline: true,
  });

  return fields;
}

function buildUserFields(
  sentryEvent: Record<string, unknown>,
  eventUser: Record<string, unknown> | undefined
) {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  // 로컬스토리지에서 유저 정보 가져오기 (클라이언트 사이드)
  const localUser = getUserFromLocalStorage();
  if (localUser) {
    fields.push({

      name: "👤 로컬 유저",

      value: cap(
        `${localUser.nickname} (${localUser.email}) - ${localUser.lastUserType}`,
        100
      ),
      inline: true,
    });
  }

  const eventContexts = sentryEvent.contexts as
    | Record<string, unknown>
    | undefined;
  const serverUser = eventContexts?.serverUser as
    | {
        nickname?: string;
        email?: string;
        lastUserType?: string;
      }
    | undefined;

  if (serverUser?.nickname) {
    fields.push({

      name: "👤 서버 유저",
      value: cap(
        `${serverUser.nickname} (${serverUser.email || "N/A"}) - ${
          serverUser.lastUserType || "N/A"

        }`,
        100
      ),
      inline: true,
    });
  }

  if (eventUser?.username || eventUser?.id) {
    fields.push({

      name: "👤 Sentry User",
      value: cap(
        `${(eventUser.username as string) || "Unknown"} ${
          eventUser.id ? `(${eventUser.id})` : ""

        }`,
        100
      ),
      inline: true,
    });
  }

  return fields;
}

function buildAdditionalFields(
  sentryEvent: Record<string, unknown>,
  eventErrorLocation: string[] | undefined
) {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  if (eventErrorLocation && eventErrorLocation.length > 0) {
    const shortStack = eventErrorLocation.slice(0, 3);
    fields.push({

      name: "📋 Stack Trace",
      value: `\`\`\`\n${cap(shortStack.join("\n"), 800)}\`\`\``,

      inline: false,
    });
  }

  const browserContexts = sentryEvent.contexts as
    | { browser?: { name?: string } }
    | undefined;
  const browserInfo = browserContexts?.browser;
  if (browserInfo?.name) {
    fields.push({

      name: "🌐 Browser",

      value: cap(browserInfo.name, 50),
      inline: true,
    });
  }

  return fields;
}

function buildFields(
  sentryEvent: Record<string, unknown>,
  eventPlatform: string,
  eventUser: Record<string, unknown> | undefined,
  eventErrorLocation: string[] | undefined
) {
  return [
    ...buildBasicFields(sentryEvent, eventPlatform),
    ...buildUserFields(sentryEvent, eventUser),
    ...buildAdditionalFields(sentryEvent, eventErrorLocation),
  ];
}

export function formatSentryErrorForDiscord(
  event: Record<string, unknown>,
  hint: Record<string, unknown>
): DiscordWebhookPayload {

  console.log("=== Discord Webhook Debug Info ===");
  console.log("Raw event:", JSON.stringify(event, null, 2));


  const sentryEvent = parser.getEvent(event);
  const eventLevel = parser.getLevel(sentryEvent);
  const eventTitle = parser.getTitle(sentryEvent);
  const eventTime = parser.getTime(sentryEvent);
  const eventLink = parser.getLink(sentryEvent);
  const eventUser = parser.getUser(sentryEvent);
  const eventFileLocation = parser.getFileLocation(sentryEvent);
  const eventErrorLocation = parser.getErrorLocation(sentryEvent, 7);
  const eventPlatform = parser.getPlatform(sentryEvent);


  console.log("Parsed event data:");
  console.log("- Level:", eventLevel);
  console.log("- Title:", eventTitle);
  console.log("- Platform:", eventPlatform);
  console.log("- File Location:", eventFileLocation);
  console.log("- Error Location:", eventErrorLocation);
  console.log("- User:", eventUser);

  const embed = createBaseEmbed(
    eventTitle,
    eventLevel || "error",

    eventTime,
    eventLink
  );
  embed.description = buildDescriptionText(

    eventLevel || "error",

    sentryEvent,
    eventFileLocation
  );
  const fields = buildFields(
    sentryEvent,
    eventPlatform,
    eventUser,
    eventErrorLocation
  );

  const discordPayload = {

    username: "Sentry",
    avatar_url: "https://sentrydiscord.dev/icons/sentry.png",

    embeds: [
      {
        ...embed,
        fields,
      },
    ],
  };

  console.log(

    "Final Discord payload:",
    JSON.stringify(discordPayload, null, 2)
  );
  console.log("=== End Discord Webhook Debug Info ===");


  return discordPayload;
}

export async function testSentryErrorFormat(): Promise<void> {

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "Sentry error format test skipped - not in production environment"

    );
    return;
  }

  const mockSentryEvent = {
    exception: {
      values: [
        {

          type: "TypeError",

          value: "Cannot read properties of undefined (reading 'status')",
          stacktrace: {
            frames: [
              {
                filename:

                  "app:///_next/static/chunks/a516f_next_dist_compiled_461c63a7._.js",
                function: "MessagePort.performWorkUntilDeadline",

                in_app: true,
                lineno: 2669,
                colno: 64,
              },
              {

                filename: "app:///_next/static/chunks/_38f0ef8e._.js",
                function: "ProductDetailPage",

                in_app: true,
                lineno: 7577,
                colno: 41,
              },
            ],
          },
        },
      ],
    },

    level: "error",
    event_id: "test-123",
    platform: "javascript",
    request: {
      url: "http://localhost:3000/products/29",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36",
      },
    },
    timestamp: Math.floor(Date.now() / 1000),
    environment: "development",
    release: "test-release",
    contexts: {
      browser: {
        name: "Chrome",
        version: "139.0.0.0",
      },
      os: {
        name: "MacIntel",
      },
    },
    tags: [
      ["environment", "development"],
      ["runtime", "client"],
      ["url", "http://localhost:3000/products/29"],

    ],
  };

  const discordPayload = formatSentryErrorForDiscord(mockSentryEvent, {});

  await sendDiscordWebhook(discordPayload);
}
