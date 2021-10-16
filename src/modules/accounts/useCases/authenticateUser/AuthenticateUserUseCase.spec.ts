import { AppError } from "@shared/errors/AppError";
import { IUserDTO } from "../../dtos/IUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Autenticação de usuário", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
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
    });

    it("Usuário incorreto", async () => {
        expect(async () => {
            let authenticate = await authenticateUserCase.execute({
                email: "kslkjlkd",
                password: "lkjlkk",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Senha incorreta", async () => {
        let user: IUserDTO = {
            name: "marcelo",
            email: "marcelok@2ll.com",
            password: "1243",
            driver_license: "87987",
        };
        await createUserUseCase.execute(user);
        expect(async () => {
            await authenticateUserCase.execute({
                email: user.email,
                password: "senha errada",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
