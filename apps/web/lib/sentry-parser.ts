type SentryIssue = Record<string, unknown>;

type SentryStacktrace = {
  frames?: Array<{
    function?: string;
    module?: string;
    filename?: string;
    abs_path?: string;
    lineno?: number;
    pre_context?: Array<string>;
    context_line?: string;
    post_context?: Array<string>;
    in_app?: boolean;
    vars?: Record<string, unknown>;
    colno?: number;
    data?: Record<string, unknown>;
  }>;
};

type SentryEvent = {
  event_id: string;
  project: string;
  release?: string;
  dist?: string;
  platform?: string;
  message?: string;
  datetime?: string;
  tags?: Array<[string, string]>;
  _metrics?: Record<string, number>;
  _ref?: number;
  _ref_version?: number;
  contexts?: Record<string, unknown>;
  culprit?: string;
  environment?: string;
  extra?: Record<string, unknown>;
  fingerprint?: Array<string>;
  grouping_config?: Record<string, unknown>;
  hashes?: Array<string>;
  level?: string;
  location?: string;
  logentry?: {
    formatted?: string;
    message?: string;
    params?: Array<string>;
  };
  logger?: string;
  metadata?: Record<string, unknown>;
  modules?: Record<string, string>;
  nodestore_insert?: number;
  received?: number;
  request?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    data?: string;
    env?: Record<string, string>;
    inferred_content_type?: string;
    api_target?: string;
    cookies?: Record<string, string>;
  };
  stacktrace?: SentryStacktrace;
  timestamp?: number;
  title?: string;
  type?: string;
  user?: {
    id?: string;
    email?: string;
    ip_address?: string;
    username?: string;
    name?: string;
    geo?: {
      country_code?: string;
      region?: string;
      city?: string;
    };
  };
  version?: string;
  url?: string;
  web_url?: string;
  issue_url?: string;
  issue_id?: string;
  exception?: {
    values: Array<{
      type?: string;
      value?: string;
      module?: string;
      mechanism?: {
        type?: string;
        handled?: boolean;
        data?: Record<string, unknown>;
      };
      stacktrace?: SentryStacktrace;
    }>;
  };
};

export function getEvent(issue: SentryIssue): SentryEvent {
  // 실제 Sentry 이벤트는 이미 올바른 구조로 들어옴
  return issue as SentryEvent;
}

export function getPlatform(event: SentryEvent) {
  return event?.platform || "unknown";
}

export function getLanguage(event: SentryEvent) {
  return event?.location?.split(".")?.slice(-1)?.[0] || "";
}

export function getContexts(event: SentryEvent) {
  const contexts = getEvent(event)?.contexts ?? {};
  const values = Object.values(contexts)
    .map((value: unknown) => {
      if (typeof value === "object" && value !== null) {
        const contextValue = value as Record<string, unknown>;
        return `${contextValue?.name} ${contextValue?.version}`;
      }
      return "undefined undefined";
    })
    .filter((value) => value !== "undefined undefined");

  return values ?? [];
}

export function getExtras(event: SentryEvent) {
  const extras = event?.extra ?? {};
  const values = Object.entries(extras).map(
    ([key, value]) => `${key}: ${value}`
  );

  return values ?? [];
}

export function getLink(event: SentryEvent) {
  return event?.web_url ?? event?.url ?? "https://sentry.io";
}

export function getTags(event: SentryEvent) {
  return event?.tags ?? [];
}

export function getLevel(event: SentryEvent) {
  return event?.level;
}

export function getType(event: SentryEvent) {
  return event?.type;
}

export function getTitle(event: SentryEvent) {
  // exception이 있으면 type과 value를 조합
  if (event?.exception?.values?.[0]) {
    const exception = event.exception.values[0];
    return `${exception.type}: ${exception.value}`;
  }

  // message가 있으면 사용
  if (event?.message) {
    return event.message;
  }

  return "Sentry Event";
}

export function getTime(event: SentryEvent) {
  if (event?.timestamp) {
    return new Date(event?.timestamp * 1000);
  }

  return new Date();
}

export function getRelease(event: SentryEvent) {
  return event?.release;
}

export function getUser(event: SentryEvent) {
  return event?.user;
}

export function getFileLocation(event: SentryEvent) {
  // location이 없으면 스택 트레이스에서 추출
  if (event?.location) {
    return event.location;
  }

  const stacktrace = getStacktrace(event);
  const firstFrame = stacktrace?.frames?.[0];

  if (firstFrame?.filename) {
    return firstFrame.filename;
  }

  return null;
}

export function getStacktrace(event: SentryEvent) {
  return (
    event?.stacktrace ||
    event?.exception?.values?.[0]?.stacktrace || {
      frames: [],
    }
  );
}

export function getErrorLocation(
  event: SentryEvent,
  maxLines = Number.POSITIVE_INFINITY
) {
  const stacktrace = getStacktrace(event);
  const locations = stacktrace?.frames;

  let files = locations?.map(
    (location) =>
      `${location?.filename}, ${location?.lineno ?? "?"}:${
        location?.colno ?? "?"
      }`
  );

  if (maxLines < Number.POSITIVE_INFINITY && files && files.length > maxLines) {
    files = files.slice(0, maxLines);
    files.push("...");
  }

  return files;
}

export function getErrorCodeSnippet(event: SentryEvent) {
  const stacktrace = getStacktrace(event);
  const location = stacktrace?.frames?.reverse()?.[0];

  if (!location) {
    return event?.culprit ?? null;
  }

  return ` ${location.pre_context?.join("\n ") ?? ""}\n>${
    location.context_line
  }\n ${location.post_context?.join("\n ") ?? ""}`;
}

export function getMessage(event: SentryEvent) {
  return event?.message;
}

function cap(str: string, length: number) {
  if (str == null || str?.length <= length) {
    return str;
  }

  return `${str.substr(0, length - 1)}…`;
}

export function getColor(level: string) {
  switch (level?.toLowerCase()) {
    case "fatal":
      return 0xff0000; // Red
    case "error":
      return 0xff6b6b; // Light Red
    case "warning":
      return 0xffa500; // Orange
    case "info":
      return 0x00bfff; // Blue
    default:
      return 0x808080; // Gray
  }
}
