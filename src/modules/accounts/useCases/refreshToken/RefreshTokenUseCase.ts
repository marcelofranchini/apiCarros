import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokens";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.jwt_secret) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.jwt_secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expiresIn_RefreshToken,
        });

        const expires_date = this.dateProvider.addDays(auth.expires_date);

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, auth.jwt_secret, {
            subject: user_id,
            expiresIn: auth.expiresIn,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}

export { RefreshTokenUseCase };
