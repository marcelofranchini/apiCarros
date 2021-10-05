import { container } from "tsyringe";
import { IUserRepository } from "../../modules/accounts/repositories/implemetations/IUserRepository";
import { UserRepository } from "../../modules/accounts/repositories/UserRepository";
import { CategoryRepository } from "../../modules/cars/repositories/CategoryRepository";
import { ICategoryRopository } from "../../modules/cars/repositories/implemetations/ICategoryRopository";
import { ISpecificationRopository } from "../../modules/cars/repositories/implemetations/ISpecificationRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/SpecificationRepository";

container.registerSingleton<ICategoryRopository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRopository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
