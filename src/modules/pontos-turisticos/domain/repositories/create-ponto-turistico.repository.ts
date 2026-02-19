import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface CreatePontoTuristicoRepository {
    create(data: PontoTuristicoEntity, t?: Transaction): Promise<PontoTuristicoEntity>
}