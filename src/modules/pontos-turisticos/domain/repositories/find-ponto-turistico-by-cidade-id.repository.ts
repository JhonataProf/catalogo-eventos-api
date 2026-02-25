import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface FindPontoTuristicoByCidadeRepository {
  findByCidadeId(cidadeId: number): Promise<PontoTuristicoEntity[] | null>;
}
