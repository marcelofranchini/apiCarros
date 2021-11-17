import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
    private message: any[] = [];
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const email = {
            to,
            subject,
            variables,
            path,
        };
        this.message.push(email);
    }
}

export { MailProviderInMemory };
