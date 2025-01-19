import Redis from "ioredis";

import env from "@/common/utils/env";

const redis = new Redis(env.REDIS_URL, {
  enableAutoPipelining: true,
});

export default redis;
