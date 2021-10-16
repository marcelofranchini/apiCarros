import { inject, injectable } from "tsyringe";
import { IUserDTO } from "../../dtos/IUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: IUserDTO): Promise<void> {
        const userExist = await this.userRepository.findByEmail(email);

        if (userExist) {
            throw new AppError("Email já cadastrado");
        }

        const hasPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name,
            email,
            password: hasPassword,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
