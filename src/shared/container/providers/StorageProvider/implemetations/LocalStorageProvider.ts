import fs from "fs";
import { IStorageProvider } from "../IStorageProvider";
import { resolve } from "path";
import upload from "@config/upload";
import { deleteFile } from "@utils/files";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);
        await deleteFile(fileName);
    }
}
export { LocalStorageProvider };
