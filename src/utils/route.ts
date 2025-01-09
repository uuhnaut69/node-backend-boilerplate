import { glob } from "glob";
import { Server } from "hyper-express";
import { container } from "tsyringe";

export default async function registerRoutes(app: Server) {
  try {
    const files = await glob(`src/routes/**/*.route.{ts,js}`, {
      ignore: ["**/base.route.{ts,js}"],
    });

    for (const file of files) {
      const importedFile = await import(`${file}`);
      const route = container.resolve(importedFile.default) as { route: any };
      if (route.route) {
        app.use(route.route);
      }
    }
  } catch (error) {
    console.error("Error registering routes:", error);
  }
}
