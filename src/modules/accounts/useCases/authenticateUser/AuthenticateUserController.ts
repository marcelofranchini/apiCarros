import { Request, Response } from "express-serve-static-core";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const authenticateUser = await authenticateUserUseCase.execute({
            password,
            email,
        });

        return response.status(201).json(authenticateUser);
    }
}

export { AuthenticateUserController };
