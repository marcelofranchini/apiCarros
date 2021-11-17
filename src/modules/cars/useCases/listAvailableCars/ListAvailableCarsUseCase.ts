import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name?: string;
    brand?: string;
    category_id?: string;
}
@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarRepository")
        private carsRepository: ICarRepository
    ) {}
    async execute({ name, brand, category_id }: IRequest) {
        const cars = await this.carsRepository.findAvailable(
            name,
            brand,
            category_id
        );

        return cars;
    }
}

export { ListAvailableCarsUseCase };
