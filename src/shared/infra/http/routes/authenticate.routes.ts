import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateUserRoutes.post("/", authenticateUserController.handle);
authenticateUserRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateUserRoutes };
