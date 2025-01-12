import Redis from "ioredis";

import env from "@/utils/env";

const redis = new Redis(env.REDIS_URL, {
  enableAutoPipelining: true,
});

export default redis;
