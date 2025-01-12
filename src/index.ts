import "reflect-metadata";

import { Server } from "hyper-express";

import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from "typeorm-transactional";

import datasource from "@/configs/database/datasource";
import configureSecurityMiddleware from "@/middlewares/cors";
import env from "@/utils/env";
import logger from "@/utils/logger";
import registerRoutes from "@/utils/route";

async function main() {
  try {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    addTransactionalDataSource(datasource);

    const app = new Server();

    configureSecurityMiddleware(app);
    await registerRoutes(app);

    await app.listen(Number(env.PORT));
    logger.info(`Server is running on port ${env.PORT}`);
  } catch (err) {
    logger.error(`Failed to start webserver on port ${env.PORT}`, err);
  }
}

main();
