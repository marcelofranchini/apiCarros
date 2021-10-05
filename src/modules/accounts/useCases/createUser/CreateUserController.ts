import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password, driver_license } = request.body;

        const user = container.resolve(CreateUserUseCase);

        await user.execute({
            name,
            email,
            password,
            driver_license,
        });

        response.status(201).json({ msg: "usuário criado com sucesso" });
    }
}

export { CreateUserController };
