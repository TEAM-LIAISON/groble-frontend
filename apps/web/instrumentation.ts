
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.TURBOPACK) {
    return;
  }


  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");

  }
}

export const onRequestError = Sentry.captureRequestError;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function extractUserInfoFromCookies(req: any) {
  const cookies = req.headers?.cookie;
  if (!cookies) {
    return null;
  }

  try {
    const userStorageMatch = cookies.match(/user-storage=([^;]+)/);
    if (userStorageMatch) {
      const decodedCookie = decodeURIComponent(userStorageMatch[1]);
      const userStorage = JSON.parse(decodedCookie);
      if (userStorage?.state?.user?.isLogin) {
        return userStorage.state.user;
      }
    }
  } catch (cookieError) {

    console.warn("Failed to parse user info from cookies:", cookieError);

  }

  return null;
}

function createStacktraceFrames(error: Error) {
  return (
    error.stack

      ?.split("\n")

      .slice(1, 11)
      .map((line, index) => {
        const match = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
        if (match) {
          return {
            function: match[1],
            filename: match[2],
            lineno: Number.parseInt(match[3]),
            colno: Number.parseInt(match[4]),
            in_app: true,
          };
        }
        return {

          function: "unknown",
          filename: "unknown",

          lineno: index,
          colno: 0,
          in_app: false,
        };
      }) || []
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const onError = async (error: Error, req: any) => {

  console.error("Server error occurred:", error);

  try {
    const { sendDiscordWebhook, formatSentryErrorForDiscord } = await import(
      "./lib/discord-webhook"

    );

    const userInfo = extractUserInfoFromCookies(req);

    const event = {
      event_id: `server-${Date.now()}`,

      level: "error",
      message: error.message,
      title: `${error.name}: ${error.message}`,
      culprit: error.stack?.split("\n")[1]?.trim() || "Unknown location",
      environment: process.env.NODE_ENV,
      platform: "nodejs",

      timestamp: Math.floor(Date.now() / 1000),
      request: {
        url: req.url,
        method: req.method,
        headers: req.headers,
      },
      contexts: {
        app: {
          environment: process.env.NODE_ENV,

          name: "groble-frontend",
        },
        runtime: {
          name: "nodejs",

          version: process.version,
        },
        // 서버에서 추출한 유저 정보 추가
        ...(userInfo && {
          serverUser: {
            nickname: userInfo.nickname,
            email: userInfo.email,
            lastUserType: userInfo.lastUserType,
            canSwitchToSeller: userInfo.canSwitchToSeller,
            alreadyRegisteredAsSeller: userInfo.alreadyRegisteredAsSeller,
          },
        }),
      },
      tags: [

        ["environment", process.env.NODE_ENV || "development"],
        ["runtime", "server"],
        ["error_type", error.name || "Error"],
        ...(userInfo
          ? [
              ["server_user_nickname", userInfo.nickname],
              ["server_user_type", userInfo.lastUserType],

            ]
          : []),
      ],
      exception: {
        values: [
          {

            type: error.name || "Error",

            value: error.message,
            stacktrace: {
              frames: createStacktraceFrames(error),
            },
          },
        ],
      },
    };

    console.log(

      "Sending server error to Discord:",

      JSON.stringify(event, null, 2)
    );

    const discordPayload = formatSentryErrorForDiscord(event, {
      originalException: error,
    });

    await sendDiscordWebhook(discordPayload);
  } catch (webhookError) {
    console.error(

      "Failed to send Discord webhook for server error:",

      webhookError
    );
  }
};
