import "reflect-metadata";

import express, { Application } from "ultimate-express";

import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from "typeorm-transactional";

import datasource from "@/common/configs/database/datasource";
import errorHandler from "@/common/middlewares/error.middleware";
import env from "@/common/utils/env";
import logger from "@/common/utils/logger";
import registerRoutes from "@/common/utils/route";

function setupMiddleware(app: Application): void {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(cors());
  app.use(helmet());
  app.use(errorHandler);
}

async function initializeDatabase(): Promise<void> {
  try {
    await datasource.initialize();
    initializeTransactionalContext();
    addTransactionalDataSource(datasource);
    logger.info("Database initialized successfully");
  } catch (error) {
    logger.error("Failed to initialize database:", error);
    throw error;
  }
}

async function startServer(app: Application): Promise<void> {
  const port = Number(env.PORT);
  app.listen(port);
  logger.info(`Server is running on port ${port}`);
}

process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  datasource.destroy().then(() => process.exit(0));
});

async function main(): Promise<void> {
  try {
    await initializeDatabase();

    const app = express();
    setupMiddleware(app);
    await registerRoutes(app);

    await startServer(app);
  } catch (err) {
    logger.error("Application failed to start:", err);
    process.exit(1);
  }
}

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Rejection:", reason);
  throw reason;
});

main();
