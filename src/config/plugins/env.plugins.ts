import "dotenv/config";
import * as env from "env-var";

require("dotenv").config();

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),

  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(), // need to be parsed before sending email
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  MAILER_PORT: env.get("MAILER_PORT").default("587").asPortNumber(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").default("gmail").asString(),
  MAILER_SENDER: env.get("MAILER_SENDER").required().asString(),
  MAILER_SECURE: env.get("MAILER_SECURE").default("false").required().asBool(),
  MAILER_RECEIVER: env.get("MAILER_RECEIVER").required().asString(),
};
