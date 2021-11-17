import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    avatar_file: string;
    user_id: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}
    async execute({ avatar_file, user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }
        const storage = await this.storageProvider.save(avatar_file, "avatar"); // retorna a url, só no caso do s3, dps será repassado para a url no mapper

        if (process.env.disk === "s3") {
            user.avatar = storage;
        } else {
            user.avatar = avatar_file;
        }

        await this.userRepository.create(user);

        return user;
    }
}

export { UpdateUserAvatarUseCase };
