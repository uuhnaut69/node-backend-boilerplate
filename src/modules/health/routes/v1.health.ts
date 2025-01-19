import { Router } from "ultimate-express";

import { container } from "tsyringe";

import HealthController from "@/modules/health/controllers/health-check.controller";

const healthRoute = Router();

const healthController = container.resolve(HealthController);

healthRoute.get("/readiness", healthController.checkReadiness);
healthRoute.get("/liveness", healthController.checkLiveness);

export default healthRoute;
