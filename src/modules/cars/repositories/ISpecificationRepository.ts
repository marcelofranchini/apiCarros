import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationDTO {
    name: string;
    description: string;
}
interface ISpecificationRopository {
    create({ name, description }: ISpecificationDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRopository, ISpecificationDTO };
