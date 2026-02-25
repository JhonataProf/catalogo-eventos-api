import { mapErrorToHttpResponse } from "@/core/http";
import { logger } from "@/core/logger";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { FindCidadeByIdUseCase } from "@/modules/cidades/application/use-cases/find-cidade-by-id.usecase";

export class FindCidadeByIdController implements Controller {
  constructor(private readonly findCidadeByIdUseCase: FindCidadeByIdUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const correlationId = request.correlationId;
    try {
      const cidadeId = Number(request.params?.id);
      const cidade = await this.findCidadeByIdUseCase.execute(cidadeId);
      return {
        statusCode: 200,
        body: cidade,
      };
    } catch (error) {
      logger.error("Erro ao buscar cidade", {
        correlationId,
        route: "FindCidadeByIdController",
        error,
      });

      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
