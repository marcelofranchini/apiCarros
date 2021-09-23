import { Category } from "../../model/Category";
import { ICategoryRopository } from "../../repositories/implemetations/ICategoryRopository";

class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRopository) {}

    execute(): Category[] {
        const categories = this.categoryRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
