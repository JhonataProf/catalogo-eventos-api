// src/modules/pontos-turisticos/application/use-cases/list-pontos-turisticos.usecase.ts
import { normalizePagination } from "@/core/http/pagination";
import { normalizeSort } from "@/core/http/sorting";
import { ListPontosTuristicosRepository } from "../../domain/repositories/list-pontos-turisticos.repository";
import { PontoTuristicoSpecificationBuilder } from "../specifications/ponto-turistico-spec.builder";
import {
  PONTO_TURISTICO_SORT_FIELDS,
  PontoTuristicoSortField,
} from "../sorting/ponto-turistico.sort";

type Input = {
  page?: number;
  limit?: number;

  // filtros
  nome?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;

  // ordenação
  sortBy?: PontoTuristicoSortField;
  sortDir?: "ASC" | "DESC" | string;
};

export class ListPontosTuristicosUseCase {
  constructor(private readonly repo: ListPontosTuristicosRepository) {}

  async execute(params: Input) {
    const { page, limit, offset } = normalizePagination(params, { maxLimit: 50 });

    const { sortBy, sortDir } = normalizeSort<PontoTuristicoSortField>(
      { sortBy: params.sortBy, sortDir: params.sortDir },
      PONTO_TURISTICO_SORT_FIELDS,
      { sortBy: "nome", sortDir: "ASC" }
    );

    const spec = new PontoTuristicoSpecificationBuilder()
      .withNome(params.nome)
      .withCidade(params.cidade)
      .withEstado(params.estado)
      .withAtivo(params.ativo)
      .build();

    const order: [string, "ASC" | "DESC"][] = [[sortBy, sortDir]];

    const { rows, count } = await this.repo.listSpec({ spec, limit, offset, order });

    return {
      items: rows,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      sort: { sortBy, sortDir },
    };
  }
}