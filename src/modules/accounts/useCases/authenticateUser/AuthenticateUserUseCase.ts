import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemetations/IUserRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { request } from "express";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        name: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Usuário e/ou senha incorretos");
        }

        const passwordVerification = await compare(user.password, password);

        if (passwordVerification) {
            throw new AppError("Usuário e/ou senha incorretos");
        }

        const token = sign({}, "94d1e45101fbf923b65b379fe9e74531", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
