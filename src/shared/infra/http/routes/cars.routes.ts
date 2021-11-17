import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListavAilableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/uploadCarImagesController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middleware/ensureAdmin";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const availableListCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", availableListCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
