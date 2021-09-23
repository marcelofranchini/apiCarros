import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";
import { importCategoryContoller } from "../modules/cars/useCases/importCategory";
import multer from "multer";

const upload = multer({
    dest: "./tmp",
});

const categoriesRoutes = Router();

categoriesRoutes.get("/", (request, response) => {
    return listCategoryController.handle(request, response);
});
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryContoller.handle(request, response);
});
export { categoriesRoutes };
