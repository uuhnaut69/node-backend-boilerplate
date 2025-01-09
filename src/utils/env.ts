import { cleanEnv, num, str } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
    choices: ["development", "production"],
  }),
  PORT: num({ default: 3000 }),
  DATABASE_PORT: num({ default: 3306 }),
  DATABASE_HOST: str({ default: "localhost" }),
  DATABASE_USERNAME: str({ default: "root" }),
  DATABASE_PASSWORD: str({ default: "root" }),
  DATABASE_NAME: str({ default: "my_database" }),
});

export default env;
