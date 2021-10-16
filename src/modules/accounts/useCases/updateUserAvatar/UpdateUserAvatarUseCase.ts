import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { deleteFile } from "../../../../utils/files";

interface IRequest {
    avatar_file: string;
    user_id: string;
}
@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute({ avatar_file, user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatar_file;

        await this.userRepository.create(user);

        return user;
    }
}

export { UpdateUserAvatarUseCase };
