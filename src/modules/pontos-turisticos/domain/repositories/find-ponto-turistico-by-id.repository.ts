import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface FindPontoTuristicoByIdRepository {
    findById(id: number, t?: Transaction): Promise<PontoTuristicoEntity | null>
}