import { glob } from "glob";
import { Router, Server } from "hyper-express";
import { container } from "tsyringe";

export default async function registerRoutes(app: Server) {
  try {
    const files = await glob(`src/routes/**/*.route.{ts,js}`, {
      ignore: ["**/base.route.{ts,js}"],
    });

    for (const file of files) {
      const importedFile = await import(`${file}`);
      const controller = container.resolve(importedFile.default) as {
        route: Router;
      };
      if (controller?.route) {
        app.use(controller?.route);
      }
    }
  } catch (error) {
    console.error("Error registering routes:", error);
  }
}
