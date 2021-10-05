import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../entities/User";

interface IUserRepository {
    create(data: IUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUserRepository };
