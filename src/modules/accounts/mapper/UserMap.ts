import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { classToClass } from "class-transformer";

class UserMap {
    static toDto({
        name,
        driver_license,
        email,
        avatar_url,
        id,
        avatar,
    }: User): IUserResponseDTO {
        const user = classToClass({
            name,
            driver_license,
            email,
            avatar_url,
            id,
            avatar,
        });
        return user;
    }
}

export { UserMap };
