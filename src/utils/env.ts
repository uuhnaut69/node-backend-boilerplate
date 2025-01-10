import { cleanEnv, num, str, bool } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
    choices: ["development", "production", "test"],
  }),
  PORT: num({ default: 3000 }),
  DATABASE_PORT: num({ default: 3306 }),
  DATABASE_HOST: str({ default: "localhost" }),
  DATABASE_USERNAME: str({ default: "root" }),
  DATABASE_PASSWORD: str({ default: "root" }),
  DATABASE_NAME: str({ default: "my_database" }),
  LOG_LEVEL: str({
    default: "info",
    choices: ["error", "warn", "info", "debug"],
  }),
  ENABLE_SWAGGER: bool({ default: true }),
  API_RATE_LIMIT: num({ default: 100 }),
  API_RATE_WINDOW_MS: num({ default: 900000 }), // 15 minutes
});

const envExtended = {
  ...env,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
  isTest: env.NODE_ENV === "test",
};

export default envExtended;
