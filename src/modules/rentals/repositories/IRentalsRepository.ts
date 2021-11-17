import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalDTO {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
    id?: string;
    end_date?: Date;
    total?: number;
}
interface IRentalsRepository {
    findOpenRenatlByCar(car_id: string): Promise<Rental>;
    findOpenRenatlByUser(user_id: string): Promise<Rental>;
    create({ car_id, user_id, expected_return_date }: IRentalDTO);
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository, IRentalDTO };
