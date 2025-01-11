import { Server } from "hyper-express";

import { glob } from "glob";

export default async function registerRoutes(app: Server) {
  try {
    const files = await glob(`src/routes/**/*.route.{ts,js}`);

    for (const file of files) {
      const routeIndex = await import(`${file}`);
      if (routeIndex) {
        app.use(routeIndex.default);
      }
    }
  } catch (error) {
    console.error("Error registering routes:", error);
  }
}
