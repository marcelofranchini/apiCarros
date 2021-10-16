import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(id);

    console.log(user);
    if (!user.admin) {
        throw new AppError("Usuário não é admin");
    }

    next();
}
