import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.TURBOPACK) {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const onError = (error: Error, req: any) => {
  if (process.env.NODE_ENV === 'production') {
    import('./lib/discord-webhook').then(
      ({ sendDiscordWebhook, formatSentryErrorForDiscord }) => {
        const event = {
          level: 'error',
          message: error.message,
          request: { url: req.url },
          contexts: { app: { environment: process.env.NODE_ENV } },
          tags: { environment: process.env.NODE_ENV },
        };

        const discordPayload = formatSentryErrorForDiscord(event, {
          originalException: error,
        });
        sendDiscordWebhook(discordPayload);
      }
    );
  }
};
