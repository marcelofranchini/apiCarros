import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    user: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: IUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.user.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        const userExist = this.user.find((user) => user.email === email);

        return userExist;
    }
    async findById(id: string): Promise<User> {
        const userExist = this.user.find((user) => user.id === id);

        return userExist;
    }
}

export { UserRepositoryInMemory };
