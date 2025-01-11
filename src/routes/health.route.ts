import { Router } from "hyper-express";

import { container } from "tsyringe";

import HealthController from "@/controllers/health-check.controller";

const healthRoute = new Router();

const healthController = container.resolve(HealthController);

healthRoute.get("/health/readiness", healthController.checkReadiness);
healthRoute.get("/health/liveness", healthController.checkLiveness);

export default healthRoute;
