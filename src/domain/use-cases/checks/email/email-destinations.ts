import { envs } from "../../../../config/plugins/env.plugins";

export const emailInfoDaily = {
  to: envs.MAILER_RECEIVER, //
  subject: "Logs of the day",
  text: "This is the list of logs",
  html: `<h3> Attached you can find logs for ${Date.now()}</h3>`,
  attachments: [
    {
      filename: "all-logs.log",
      path: "./logs/all-logs.log",
    },
    {
      filename: "critical-logs.log",
      path: "./logs/critical-logs.log",
    },
    {
      filename: "low-logs.log",
      path: "./logs/low-logs.log",
    },
  ],
};

export const emailInfoWithLogs = {
  to: envs.MAILER_RECEIVER, //
  subject: "Logs of the day with sent emails",
  text: "This is the list of logs with sent emails",
  html: `<h3> Attached you can find logs for ${Date.now()}</h3>`,
  attachments: [
    {
      filename: "all-logs.log",
      path: "./logs/all-logs.log",
    },
  ],
};
