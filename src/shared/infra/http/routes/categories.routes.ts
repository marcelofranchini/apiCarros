import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import listCategoryController from "../../../../modules/cars/useCases/listCategory";
import multer from "multer";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const upload = multer({
    dest: "./tmp",
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryContoller = new ImportCategoryController();

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController().handle(request, response);
});
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    createCategoryController.handle
);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryContoller.handle
);
export { categoriesRoutes };
