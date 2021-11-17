import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { SendForgotPassWordMailUseCase } from "./SendForgotPassWordMailUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPassWordMailUseCase;

describe("Send Forgot Password Mail", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPassWordMailUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await userRepositoryInMemory.create({
            name: "pedro",
            email: "pedro@12.com",
            password: "123",
            driver_license: "888999",
        });

        await sendForgotPasswordMailUseCase.execute("pedro@12.com");
        expect(sendMail).toHaveBeenCalled();
    });

    it("should be able to send an email if user does not exist", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("errado@12.com")
        ).rejects.toEqual(new AppError("User not exist"));
    });

    // it("should be able to send a forgot password mail to user", async () => {
    //     const tokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    //     await userRepositoryInMemory.create({
    //         name: "pedro",
    //         email: "pedro@12.com",
    //         password: "123",
    //         driver_license: "888999",
    //     });

    //     await sendForgotPasswordMailUseCase.execute("pedro@12.com");
    //     expect(tokenEmail).toHaveBeenCalled();
    // });
});
