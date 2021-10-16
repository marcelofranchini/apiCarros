import { ICategoryRopository } from "../../repositories/ICategoryRopository";

import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRopository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryExists = await this.categoryRepository.findByName(name);
        if (categoryExists) {
            throw new AppError("categoria já cadastrada");
        }
        this.categoryRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
