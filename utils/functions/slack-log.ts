const logTypeToEnv = {
  alerts: process.env.PATTERN_REVEAL_SLACK_HOOK_ALERTS,
  cron: process.env.PATTERN_REVEAL_SLACK_HOOK_CRON,
  errors: process.env.PATTERN_REVEAL_SLACK_HOOK_ERRORS,
  reflections: process.env.PATTERN_REVEAL_SLACK_HOOK_REFLECTIONS,
};

export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "alerts" | "cron" | "errors" | "reflections";
  mention?: boolean;
}) => {
  /* Log a message to the console */
  console.log(message);

  const HOOK = logTypeToEnv[type];
  if (!HOOK) return;
  try {
    return await fetch(HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // prettier-ignore
              text: `${mention ? "<@U0404G6J3NJ> " : ""}${(type === "alerts" || type === "errors") ? ":alert: " : ""}${message}`,
            },
          },
        ],
      }),
    });
  } catch (e) {
    console.log(`Failed to log to Dub Slack. Error: ${e}`);
  }
};
