import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface FindPontoTuristicoByCidadeRepository {
    findByCidadeId(cidadeId: number, t?: Transaction): Promise<PontoTuristicoEntity[]|null>
}