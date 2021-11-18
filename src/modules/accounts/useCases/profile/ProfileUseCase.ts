import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.userRepository.findById(id);

        // UserMap.toDto(user); // metodo static nao precisa instanciar a classe
        //delete user.password;
        //delete user.admin; user conceito de maper

        return UserMap.toDto(user);
    }
}

export { ProfileUseCase };
