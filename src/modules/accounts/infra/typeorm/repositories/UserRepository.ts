import { getRepository, Repository } from "typeorm";
import { IUserDTO } from "../../../dtos/IUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.repository.findOne(id);

        return user;
    }

    async create({
        name,
        email,
        password,
        driver_license,
        id,
        avatar,
    }: IUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id,
        });
        await this.repository.save(user);
    }
}

export { UserRepository };
