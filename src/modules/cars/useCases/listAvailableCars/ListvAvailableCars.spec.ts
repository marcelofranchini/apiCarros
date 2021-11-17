import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carRepositoryInMemory: CarRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;
describe("Listando Carros", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
    });

    it("Deve listar todos os carros com disponibilidade", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Civic2",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "9ewewewe",
            fine_amount: 1,
            brand: "honda",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Deve listar todos os carros com disponibilidade pelo nome", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Civic3",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "9ewewewekkk",
            fine_amount: 1,
            brand: "honda",
            category_id: "category_id2",
        });

        const cars = await listCarsUseCase.execute({ name: "Civic3" });

        expect(cars).toEqual([car]);
    });

    it("Deve listar todos os carros com disponibilidade pelo marca", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Civic33",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "9ewewewe",
            fine_amount: 1,
            brand: "hondaBr",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({ brand: "hondaBr" });

        expect(cars).toEqual([car]);
    });

    it("Deve listar todos os carros com disponibilidade pela catagoria", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Civic3",
            description: "carro passeio",
            daily_rate: 10,
            license_plate: "9ewewewe",
            fine_amount: 1,
            brand: "honda",
            category_id: "category_id3",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "category_id3",
        });

        expect(cars).toEqual([car]);
    });
});
