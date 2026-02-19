import { Transaction } from "sequelize";

export interface DeletePontoTuristicoRepository {
    delete(id: number, t?: Transaction): Promise<boolean>
}