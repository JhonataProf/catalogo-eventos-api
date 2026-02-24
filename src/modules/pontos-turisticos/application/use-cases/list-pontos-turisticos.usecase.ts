// src/modules/pontos-turisticos/application/use-cases/list-pontos-turisticos.usecase.ts
import { ListPontosTuristicosRepository } from "../../domain/repositories/list-pontos-turisticos.repository";
import { SpecificationBuilder } from "@/core/domain/specification/specification-builder";
import { byCategoria, byCidade, byEstado, bySearch, ListPontosParams } from "../../domain/specs/ponto-turistico.filters";

export class ListPontosTuristicosUseCase {
  private readonly specBuilder = new SpecificationBuilder<ListPontosParams>()
    .add(bySearch)
    .add(byCidade)
    .add(byEstado)
    .add(byCategoria);

  constructor(private readonly repo: ListPontosTuristicosRepository) {}

  async execute(params: { page: number; limit: number } & ListPontosParams) {
    const page = Math.max(1, Number(params.page ?? 1));
    const limit = Math.min(50, Math.max(1, Number(params.limit ?? 10)));

    const spec = this.specBuilder.build(params);

    const { items, total } = await this.repo.listSpec({ page, limit, spec });

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}