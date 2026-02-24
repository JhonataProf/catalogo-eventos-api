// src/modules/pontos-turisticos/presentation/http/controllers/list-pontos-turisticos.controller.ts
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { Links, ok } from "@/core/http/http-resource";
import { ListPontosTuristicosUseCase } from "../../../application/use-cases/list-pontos-turisticos.usecase";

export class ListPontosTuristicosController implements Controller {
  constructor(private readonly useCase: ListPontosTuristicosUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const q = (req.query ?? {}) as any;

    const result = await this.useCase.execute({
      page: q.page,
      limit: q.limit,
      nome: q.nome,
      cidade: q.cidade,
      estado: q.estado,
      ativo: q.ativo === "true" ? true : q.ativo === "false" ? false : undefined,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });

    const data = {
      items: result.items.map((item) => ({
        id: item.id,
        nome: item.nome,
        cidade: item.cidade,
        estado: item.estado,
        ativo: item.ativo,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
      sort: result.sort,
    };
    const links: Links = {
      self: { href: `/pontos-turisticos?page=${result.page}&limit=${result.limit}`, method: "GET" },
      next:
        result.page < result.totalPages
          ? { href: `/pontos-turisticos?page=${result.page + 1}&limit=${result.limit}`, method: "GET" }
          : undefined,
      prev:
        result.page > 1
          ? { href: `/pontos-turisticos?page=${result.page - 1}&limit=${result.limit}`, method: "GET" }
          : undefined,
    };

    const meta = {
      total: result.total,
      totalPages: result.totalPages,
      page: result.page,
      limit: result.limit,
      sort: result.sort,
    };

    return ok({ data, links, meta });
  }
}