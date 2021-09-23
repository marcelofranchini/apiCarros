import { Category } from "../../model/Category";

interface ICategoryDTO {
    name: string;
    description: string;
}
interface ICategoryRopository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICategoryDTO): void;
}

export { ICategoryRopository, ICategoryDTO };
