import { Express } from "ultimate-express";

import { glob } from "glob";

import logger from "./logger";

export default async function registerRoutes(app: Express) {
  try {
    const files = await glob(`src/modules/**/routes/*.{ts,js}`);

    for (const filePath of files) {
      const pathSegments = filePath?.split("/");
      const fileName = pathSegments[pathSegments?.length - 1];

      if (!fileName) {
        logger.error(`Invalid route file path: ${filePath}`);
        return;
      }

      const routePath = fileName?.slice(0, -3)?.replace(/\./g, "/");

      const routeIndex = await import(`${filePath}`);
      if (routeIndex) {
        app.use(`/${routePath}`, routeIndex.default);
      }
    }
  } catch (error) {
    logger.error("Error while registering routes", error);
  }
}
