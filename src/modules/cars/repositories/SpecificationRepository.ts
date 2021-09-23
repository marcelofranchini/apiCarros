import { Specification } from "../model/Specification";
import {
    ISpecificationDTO,
    ISpecificationRopository,
} from "./implemetations/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRopository {
    private specifications: Specification[];
    constructor() {
        this.specifications = [];
    }
    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        );

        return specification;
    }
    list(): Specification[] {
        return this.specifications;
    }
    create({ name, description }: ISpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }
}

export { SpecificationRepository };
