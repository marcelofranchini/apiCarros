import { Request, Response } from "express";
import { importCategoryContoller } from ".";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
    handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoryUseCase.execute(file);

        return response.status(201).json({ file });
    }
}

export { ImportCategoryController };
