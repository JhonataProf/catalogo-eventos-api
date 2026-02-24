// src/modules/pontos-turisticos/domain/repositories/list-pontos-turisticos.repository.ts
import { Specification } from "@/core/domain/specification/specification";
import { PontoTuristicoEntity } from "../entities/ponto-turistico.entity";

export interface ListPontosTuristicosRepository {
  listSpec(params: {
    page: number;
    limit: number;
    spec?: Specification;
  }): Promise<{
    items: PontoTuristicoEntity[];
    total: number;
  }>;
}