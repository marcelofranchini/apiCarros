import { Router } from "express";
import multer from "multer";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileController } from "@modules/accounts/useCases/profile/ProfileController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileControler = new ProfileController();
usersRoutes.post("/", createUsersController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileControler.handle);
export { usersRoutes };
