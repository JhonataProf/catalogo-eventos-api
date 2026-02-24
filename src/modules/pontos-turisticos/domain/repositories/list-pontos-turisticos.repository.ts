// src/modules/pontos-turisticos/domain/repositories/list-pontos-turisticos.repository.ts
import { QuerySpecification } from "../../domain/specifications/query-specification";

export interface ListPontosTuristicosRepository {
  listSpec(params: {
    spec?: QuerySpecification | null;
    limit: number;
    offset: number;
    order: [string, "ASC" | "DESC"][]; // Sequelize order
  }): Promise<{ rows: any[]; count: number }>;
}