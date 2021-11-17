import { IStorageProvider } from "../IStorageProvider";
import { S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";
import upload from "@config/upload";
import { deleteFile } from "@utils/files";
import mime from "mime";
class S3StorageProvider implements IStorageProvider {
    private client: S3;
    constructor() {
        this.client = new S3({
            region: process.env.AWS_REGION,
        });
    }
    async save(file: string, folder: string): Promise<string> {
        const fileName = resolve(upload.tmpFolder, file);
        const fileDecode = await fs.promises.readFile(fileName);
        const ContentType = mime.getType(fileName);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`, //ele cria o folder novo
                Key: process.env.AWS_SECRET_ACCESS_KEY,
                ACL: "public-read",
                Body: fileDecode,
                ContentType, //para nao realizar download auto da img e sim abrir no navegador
            })
            .promise();
        await deleteFile(fileName);

        const urlS3 = await this.client.getSignedUrl("putObject", {
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: process.env.AWS_SECRET_ACCESS_KEY,
        });
        const [url] = urlS3.split("?");

        console.log(url);
        // return fileName;
        return url;
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`, //ele cria o folder novo
                Key: process.env.AWS_SECRET_ACCESS_KEY,
            })
            .promise();
    }
}

export { S3StorageProvider };
