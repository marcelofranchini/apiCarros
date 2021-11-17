import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPassWordMailController } from "@modules/accounts/useCases/sendForgotPassWordMail/SendForgotPassWordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPassWordController = new SendForgotPassWordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPassWordController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
