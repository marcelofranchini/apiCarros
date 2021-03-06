import "reflect-metadata";
import "dotenv/config";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../swagger.json";

import createConnection from "../typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter";
createConnection();
const app = express();

app.use(rateLimiter);
app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
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

export { app };
