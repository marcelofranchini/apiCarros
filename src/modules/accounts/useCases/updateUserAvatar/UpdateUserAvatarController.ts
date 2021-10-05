import { request, Request, Response } from "express";
import { container } from "tsyringe";
import { UserRepository } from "../../repositories/UserRepository";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const userUpdateUseCase = container.resolve(UpdateUserAvatarUseCase);
        const { id } = request.user;

        const avatar_file = request.file.filename;

        await userUpdateUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).json();
    }
}

export { UpdateUserAvatarController };
