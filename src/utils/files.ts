import fs from "fs";

export const deleteFile = async (fileName: string) => {
    try {
        await fs.promises.stat(fileName); // verifica se o arquivo existe
    } catch {
        return;
    }
    await fs.promises.unlink(fileName); // exclui
};
