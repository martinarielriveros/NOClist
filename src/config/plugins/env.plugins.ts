import "dotenv/config";
import * as env from "env-var";

require("dotenv").config();

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required(),
  MAILER_PASSWORD: env.get("MAILER_PASSWORD").required(),
  MAILER_HOST: env.get("MAILER_HOST").required(),
  MAILER_PORT: env.get("MAILER_PORT").default("587").asPortNumber(),
  MAILER_SECURE: env.get("MAILER_SECURE").default("false").asBool(),
};
