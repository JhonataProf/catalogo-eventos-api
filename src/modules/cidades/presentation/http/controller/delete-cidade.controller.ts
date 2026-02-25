import { mapErrorToHttpResponse } from "@/core/http";
import { logger } from "@/core/logger/logger";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { DeleteCidadeUseCase } from "@/modules/cidades/application/use-cases";

export class DeleteCidadeController implements Controller {
  constructor(private readonly deleteCidadeUseCase: DeleteCidadeUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const correlationId = request.correlationId;
    try {
      const cidadeId = Number(request.params?.id);
      await this.deleteCidadeUseCase.execute(cidadeId);
      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      logger.error("Erro ao deletar cidade", {
        correlationId,
        route: "DeleteCidadeController",
        error,
      });

      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
