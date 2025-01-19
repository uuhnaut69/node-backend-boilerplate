import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

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
  REDIS_URL: str({ default: "redis://localhost:6379" }),
  JWT_SECRET: str({ default: 'your-secret-key' }),
  JWT_EXPIRES_IN: str({ default: '1h' }),
  JWT_REFRESH_SECRET: str({ default: 'your-refresh-secret-key' }),
  JWT_REFRESH_EXPIRES_IN: str({ default: '7d' }),
});

const envExtended = {
  ...env,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",
  isTest: env.NODE_ENV === "test",
};

export default envExtended;
