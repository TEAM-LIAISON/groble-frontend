import * as parser from "./sentry-parser";

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
  // 프로덕션 환경에서만 Discord 알림 전송
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

  const embed = {
    title: cap(eventTitle, 250),
    description: "",
    color: parser.getColor(eventLevel || "error"),
    author: {
      name: "Sentry Event",
      icon_url: "https://sentrydiscord.dev/icons/sentry.png",
    },
    footer: {
      text: "Sentry Discord Integration",
      icon_url: "https://sentrydiscord.dev/icons/sentry.png",
    },
    timestamp: eventTime.toISOString(),
    url:
      eventLink.startsWith("https://") || eventLink.startsWith("http://")
        ? eventLink
        : undefined,
  };

  let descriptionText = "";

  descriptionText += `> **${eventLevel?.toUpperCase()}** ${
    sentryEvent.environment ? `on ${sentryEvent.environment}` : ""
  }\n\n`;

  if (eventFileLocation) {
    descriptionText += `📄 **File:** \`${cap(eventFileLocation, 100)}\`\n\n`;
  }

  embed.description = descriptionText;

  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  if (sentryEvent.request?.url) {
    fields.push({
      name: "📍 URL",
      value: cap(sentryEvent.request.url, 200),
      inline: false,
    });
  }

  const errorType = sentryEvent.exception?.values?.[0]?.type;
  if (errorType) {
    fields.push({
      name: "🔍 Error Type",
      value: errorType,
      inline: true,
    });
  }

  fields.push({
    name: "🏷️ Environment",
    value: sentryEvent.environment || "Unknown",
    inline: true,
  });

  fields.push({
    name: "📱 Platform",
    value: eventPlatform || "Unknown",
    inline: true,
  });

  if (eventUser?.username || eventUser?.id) {
    fields.push({
      name: "👤 User",
      value: cap(
        `${eventUser.username || "Unknown"} ${
          eventUser.id ? `(${eventUser.id})` : ""
        }`,
        100
      ),
      inline: true,
    });
  }

  if (eventErrorLocation && eventErrorLocation.length > 0) {
    const shortStack = eventErrorLocation.slice(0, 3); // 처음 3개만
    fields.push({
      name: "📋 Stack Trace",
      value: `\`\`\`\n${cap(shortStack.join("\n"), 800)}\`\`\``,
      inline: false,
    });
  }

  const browserInfo = sentryEvent.contexts?.browser;
  if ((browserInfo as any).name) {
    fields.push({
      name: "🌐 Browser",
      value: cap((browserInfo as any).name, 50),
      inline: true,
    });
  }

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
