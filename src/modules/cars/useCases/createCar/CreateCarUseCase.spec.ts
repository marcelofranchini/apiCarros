import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Criando Carros", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
    });

    it("Deve cadastrar um novo carro", async () => {
        const car = {
            name: "Civic",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "ke-3e-3o-kllkkl",
            fine_amount: 1,
            brand: "honda",
            category_id: "2900293209",
        };
        const newCar = await createCarUseCase.execute(car);

        expect(newCar).toHaveProperty("id");
    });
    it("Deve cadastrar um novo carro com disponibilidade", async () => {
        const car = {
            name: "Civic",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "ke-3e-kkk3o-kklklk",
            fine_amount: 1,
            brand: "honda",
            category_id: "2900293209",
        };
        const newCar = await createCarUseCase.execute(car);

        expect(newCar.available).toBe(true);
    });

    it("Não deve cadastrar carros com a mesma placa", async () => {
        expect(async () => {
            const car = {
                name: "Civic",
                description: "carro passeio",
                daily_rate: 10,
                license_plate: "ke-3e-3o-2",
                fine_amount: 1,
                brand: "honda",
                category_id: "2900293209",
            };

            const car2 = {
                name: "Civic2",
                description: "carro passeio",
                daily_rate: 10,
                license_plate: "ke-3e-3o-2",
                fine_amount: 1,
                brand: "honda",
                category_id: "2900293209",
            };
            await createCarUseCase.execute(car);
            await createCarUseCase.execute(car2);
        }).rejects.toBeInstanceOf(AppError);
    });
});
