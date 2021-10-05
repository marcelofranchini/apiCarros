import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationRopository } from "../../repositories/implemetations/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRopository
    ) {}
    async execute({ name, description }: IRequest) {
        const specificationExists =
            await this.specificationRepository.findByName(name);

        if (specificationExists) {
            throw new AppError("Specification já existente");
        }
        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
