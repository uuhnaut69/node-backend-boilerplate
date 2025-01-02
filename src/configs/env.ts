import { cleanEnv, num } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
});

export default env;
