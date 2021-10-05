import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

import { container } from "tsyringe";

class CreateSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createSpecification = container.resolve(
            CreateSpecificationUseCase
        );
        await createSpecification.execute({ name, description });

        return response.status(201).json();
    }
}

export { CreateSpecificationController };
