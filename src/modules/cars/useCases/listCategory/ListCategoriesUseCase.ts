import { Category } from "../../entities/Category";
import { ICategoryRopository } from "../../repositories/implemetations/ICategoryRopository";

class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRopository) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
