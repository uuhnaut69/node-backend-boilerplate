import { Router } from "ultimate-express";

import { container } from "tsyringe";

import validateRequest from "@/common/middlewares/validation.middleware";
import AuthController from "@/modules/auth/controllers/auth.controller";
import LoginRequest from "@/modules/auth/dtos/login.request";
import RefreshTokenRequest from "@/modules/auth/dtos/refresh-token.request";

const router = Router();
const authController = container.resolve(AuthController);

router.post("/login", validateRequest(LoginRequest), async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/refresh",
  validateRequest(RefreshTokenRequest),
  async (req, res, next) => {
    try {
      await authController.refresh(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
