import fs from "fs";
import csParse from "csv-parse";
import { ICategoryRopository } from "../../repositories/implemetations/ICategoryRopository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoryRepository: ICategoryRopository) {}
    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path);

            const parseFile = csParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const categoryExists = this.categoryRepository.findByName(name);

            if (!categoryExists) {
                this.categoryRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
