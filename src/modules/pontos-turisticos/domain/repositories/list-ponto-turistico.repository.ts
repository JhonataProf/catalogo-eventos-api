import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface ListPontoTuristicoRespository {
    list(): Promise<PontoTuristicoEntity[]>
}