import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


export default (): ListCategoriesController => {
    const categoryRepository = new CategoryRepository();

    const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);

    const listCategoryController = new ListCategoriesController(
        listCategoryUseCase
    );

    return listCategoryController;
};
