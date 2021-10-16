import "reflect-metadata";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../swagger.json";

import createConnection from "../typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();

app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                message: error.message,
            });
        }

        return response.status(500).json({
            message: `internal server error - ${error.message} `,
        });
    }
);

app.listen(3333, () => console.log("rodando"));
