import { Request, Response } from "hyper-express";

import { injectable } from "tsyringe";

import { responseSuccess } from "@/utils/http";

@injectable()
export default class HealthController {
  async checkReadiness(req: Request, res: Response) {
    responseSuccess(req, res, "Ready");
  }

  async checkLiveness(_req: Request, res: Response) {
    responseSuccess(_req, res, "Alive");
  }
}
