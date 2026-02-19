import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface UpdatePontoTuristicoRepository {
    update(id:number, data: Partial<PontoTuristicoEntity>, t?: Transaction): Promise<PontoTuristicoEntity|null>
}