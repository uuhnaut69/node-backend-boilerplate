import { Express } from "ultimate-express";

import { glob } from "glob";
import path from "path";

import logger from "./logger";

export default async function registerRoutes(app: Express): Promise<void> {
  try {
    const baseDir = __dirname.includes("dist") ? "dist" : "src";
    const files = await glob(`${baseDir}/modules/**/routes/*.{ts,js}`);

    for (const filePath of files) {
      const { name } = path.parse(filePath);
      const routePath = name.replace(/\./g, "/");

      try {
        const absolutePath = path.resolve(process.cwd(), filePath);
        const routeModule = await import(absolutePath);

        if (!routeModule?.default) {
          logger.error(`No default export found in route file: ${filePath}`);
          continue;
        }

        app.use(`/${routePath}`, routeModule.default);
      } catch (importError) {
        logger.error(`Failed to import route file: ${filePath}`, importError);
        continue;
      }
    }
  } catch (error) {
    logger.error("Error while registering routes", error);
    throw error;
  }
}
