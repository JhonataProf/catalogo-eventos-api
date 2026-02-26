// src/modules/events/presentation/http/controllers/list-events.controller.ts
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { ok } from "@/core/http/http-resource";
import { ListEventsUseCase } from "@/modules/events/application/use-cases/list-events.usecase";
import { buildPaginationLinks } from "@/core/http/hateoas/pagination-links";

export class ListEventsController implements Controller {
  constructor(private readonly useCase: ListEventsUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const q = (req.query ?? {}) as any;

    const result = await this.useCase.execute({
      page: q.page ? Number(q.page) : undefined,
      limit: q.limit ? Number(q.limit) : undefined,

      titulo: q.titulo,
      cat: q.cat,
      cidadeId: q.cidadeId ? Number(q.cidadeId) : undefined,

      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });

    const data = {
      items: result.items.map((e) => e.props),
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
      sort: result.sort,
    };

    const base = `/api/eventos`;
    const mk = (page: number) =>
      `${base}?page=${page}&limit=${result.limit}` +
      (q.titulo ? `&titulo=${encodeURIComponent(q.titulo)}` : "") +
      (q.cat ? `&cat=${encodeURIComponent(q.cat)}` : "") +
      (q.cidadeId ? `&cidadeId=${encodeURIComponent(q.cidadeId)}` : "") +
      (q.sortBy ? `&sortBy=${encodeURIComponent(q.sortBy)}` : "") +
      (q.sortDir ? `&sortDir=${encodeURIComponent(q.sortDir)}` : "");

    const links = buildPaginationLinks({
      basePath: base,
      page: result.page,
      totalPages: result.totalPages,
      limit: result.limit,
      query: q,
      includeFirstLast: true,
    });

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