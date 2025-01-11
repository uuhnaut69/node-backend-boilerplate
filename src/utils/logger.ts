import { createLogger, format, transports } from "winston";

import env from "@/utils/env";

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase()}] - ${stack || message}`;
});

const logger = createLogger({
  level: env.LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    customFormat
  ),
  transports: [new transports.Console()],
});

export default logger;
