import { container } from "tsyringe";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/CategoryRepository";
import { ICategoryRopository } from "../../modules/cars/repositories/ICategoryRopository";
import { ISpecificationRopository } from "../../modules/cars/repositories/ISpecificationRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";

container.registerSingleton<ICategoryRopository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRopository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
