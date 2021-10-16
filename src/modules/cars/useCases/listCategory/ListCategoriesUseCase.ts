import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRopository } from "../../repositories/ICategoryRopository";

class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRopository) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
