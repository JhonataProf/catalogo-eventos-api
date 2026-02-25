import { mapErrorToHttpResponse } from "@/core/http";
import { logger } from "@/core/logger";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { ListCidadeUseCase } from "@/modules/cidades/application/use-cases";

export class ListCidadeController implements Controller {
  constructor(private readonly listCidadesUseCase: ListCidadeUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const correlationId = request.correlationId;
    try {
      const cidades = await this.listCidadesUseCase.execute();
      return {
        statusCode: 200,
        body: cidades,
      };
    } catch (error) {
      logger.error("Erro ao listar cidades", {
        correlationId,
        route: "ListCidadeController",
        error,
      });

      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
