import { ISpecificationRopository } from "../../repositories/implemetations/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRopository) {}
    execute({ name, description }: IRequest) {
        const specificationExists =
            this.specificationRepository.findByName(name);

        if (specificationExists) {
            throw new Error("Specification já existente");
        }
        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
