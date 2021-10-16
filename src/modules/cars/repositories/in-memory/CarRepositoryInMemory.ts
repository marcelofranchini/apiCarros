//import { CarDTO } from "@modules/cars/dtos/CarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";

interface CarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    id?: string;
}

class CarRepositoryInMemory implements ICarRepository {
    findByLicensePlate(license_plate: string): Promise<Car> {
        throw new Error("Method not implemented.");
    }
    private car: Car[] = [];
    async create(data: CarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, { ...data });

        this.car.push(car);

        return car;
    }
    async findLicensePlate(license_plate: string): Promise<Car> {
        const car = this.car.find((car) => car.license_plate === license_plate);
        return car;
    }
}

export { CarRepositoryInMemory };
