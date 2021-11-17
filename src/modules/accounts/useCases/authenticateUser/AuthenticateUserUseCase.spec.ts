import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { IUserDTO } from "../../dtos/IUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;
let usersTokensUseCase: UsersTokensRepositoryInMemory;

describe("Autenticação de usuário", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensUseCase = new UsersTokensRepositoryInMemory();

        authenticateUserCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
            usersTokensUseCase,
            dateProvider
        );

        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("Realizar Login", async () => {
        let user: IUserDTO = {
            name: "marcelo",
            email: "marcelok@2ll.com",
            password: "1243",
            driver_license: "87987",
        };
        await createUserUseCase.execute(user);

        let authenticate = await authenticateUserCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(authenticate).toHaveProperty("token");
        expect(authenticate).toHaveProperty("refresh_token");
    });

    it("Usuário incorreto", async () => {
        await expect(
            authenticateUserCase.execute({
                email: "errado",
                password: "jnjnjn",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("Senha incorreta", async () => {
        let user: IUserDTO = {
            name: "marcelo",
            email: "marc@2ll.com",
            password: "1243",
            driver_license: "879879",
        };
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserCase.execute({
                email: user.email,
                password: "senha errada",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});
