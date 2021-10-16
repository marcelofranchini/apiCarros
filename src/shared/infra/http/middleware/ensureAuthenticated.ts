import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";

interface IPayload {
    sub: string;
}
async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authenticateHeader = request.headers.authorization;

    if (!authenticateHeader) {
        throw new AppError("Token não informado");
    }

    const [, token] = authenticateHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "94d1e45101fbf923b65b379fe9e74531"
        ) as IPayload;

        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuário não existente");
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError("token inválido");
    }
}

export default ensureAuthenticated;
