import { Request, Response } from "ultimate-express";

import { injectable } from "tsyringe";

import { responseSuccess } from "@/common/utils/http";

@injectable()
export default class HealthController {
  public async checkReadiness(req: Request, res: Response) {
    responseSuccess(req, res, "Ready");
  }

  public async checkLiveness(_req: Request, res: Response) {
    responseSuccess(_req, res, "Alive");
  }
}
