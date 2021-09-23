import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryContoller = new ImportCategoryController(
    importCategoryUseCase
);

export { importCategoryContoller };
