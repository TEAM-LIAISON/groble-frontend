interface DiscordWebhookPayload {
  content?: string;
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
    };
  }>;
}

export async function sendDiscordWebhook(
  payload: DiscordWebhookPayload
): Promise<void> {
  const webhookUrl =
    "https://discord.com/api/webhooks/1413156570086506587/wwEDp_4aJ84YC6fzbomnjq-DnHGz-4jQUT7CeBIE3D5M5DI1jml5-905rtf7QiRz9StN";

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);
  }
}

export function formatSentryErrorForDiscord(
  event: any,
  hint: any
): DiscordWebhookPayload {
  const error = hint.originalException || event.exception?.values?.[0];
  const user = event.user;
  const tags = event.tags || {};
  const context = event.contexts || {};

  const getColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "fatal":
        return 0xff0000;
      case "error":
        return 0xff6b6b;
      case "warning":
        return 0xffa500;
      case "info":
        return 0x00bfff;
      default:
        return 0x808080;
    }
  };

  return {
    embeds: [
      {
        title: `🚨 Sentry Error: ${error?.type || "Unknown Error"}`,
        description:
          error?.value || event.message || "No error message available",
        color: getColor(event.level),
        fields: [
          {
            name: "📍 Location",
            value: `${event.request?.url || "Unknown URL"}`,
            inline: false,
          },
          {
            name: "👤 User",
            value: user
              ? `${user.username || user.id || "Unknown"}`
              : "Anonymous",
            inline: true,
          },
          {
            name: "🏷️ Environment",
            value: tags.environment || context.app?.environment || "Unknown",
            inline: true,
          },
          {
            name: "📱 Platform",
            value: context.browser?.name || context.os?.name || "Unknown",
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Sentry Error Alert",
        },
      },
    ],
  };
}
