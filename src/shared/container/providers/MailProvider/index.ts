import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implemetations/EtherealProvider";
import { SESMailProvider } from "./implemetations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider), //forma de dizer new EtherealMailProvider()
    ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
