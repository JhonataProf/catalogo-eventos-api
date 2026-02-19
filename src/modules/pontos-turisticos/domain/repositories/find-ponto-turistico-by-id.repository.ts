import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface FindPontoTuristicoByIdRepository {
    findByCidadeId(cidadeId: number, t?: Transaction): Promise<PontoTuristicoEntity[]|null>
}