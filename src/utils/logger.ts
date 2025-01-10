import { createLogger, format, transports } from "winston";

import env from "@/utils/env";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase()}] - ${stack || message}`;
});

const logger = createLogger({
  level: env.LOG_LEVEL,
  levels,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    customFormat
  ),
  defaultMeta: { service: "api" },
  transports: [new transports.Console()],
});

export default logger;
