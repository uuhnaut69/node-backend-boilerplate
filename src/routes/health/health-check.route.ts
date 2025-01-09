import { Request, Response } from "hyper-express";

import { ReasonPhrases } from "http-status-codes";
import { injectable } from "tsyringe";

import BaseRoute from "@/routes/base.route";
import { responseOk } from "@/utils/http";

@injectable()
export default class HealthController extends BaseRoute {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.route.get("/health/readiness", this.checkReadiness);
    this.route.get("/health/liveness", this.checkLiveness);
  }

  private async checkReadiness(_req: Request, res: Response) {
    responseOk(res, "Ready", ReasonPhrases.OK);
  }

  private async checkLiveness(_req: Request, res: Response) {
    responseOk(res, "Alive", ReasonPhrases.OK);
  }
}
