import { ICategoryRopository } from "../../repositories/implemetations/ICategoryRopository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoryRepository: ICategoryRopository) {}

    execute({ description, name }: IRequest): void {
        const categoryExists = this.categoryRepository.findByName(name);
        if (categoryExists) {
            throw new Error("categoria já cadastrada");
        }
        this.categoryRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
