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
    private car: Car[] = [];
    async create(data: CarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, { ...data });

        this.car.push(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.car.find((car) => car.license_plate === license_plate);
        return car;
    }

    async findAvailable(
        brand?: string,
        name?: string,
        category_id?: string
    ): Promise<Car[]> {
        const cars = this.car.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (name && car.name === name) ||
                (category_id && car.category_id === category_id)
            ) {
                return car;
            }

            return null;
        });

        return cars;
    }
    async findById(id: string): Promise<Car> {
        return this.car.find((car) => car.id === id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.car.findIndex((car) => car.id === id);
        this.car[findIndex].available = available;
    }
}

export { CarRepositoryInMemory };
