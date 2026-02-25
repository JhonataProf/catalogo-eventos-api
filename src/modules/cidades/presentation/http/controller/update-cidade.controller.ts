import { mapErrorToHttpResponse } from "@/core/http";
import { logger } from "@/core/logger";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { UpdateCidadeUseCase } from "@/modules/cidades/application/use-cases";

export class UpdateCidadeController implements Controller {
  constructor(private readonly updateCidadeUseCase: UpdateCidadeUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const correlationId = request.correlationId;
      try {
          const cidadeId = Number(request.params?.id);
          const updatedCidade = await this.updateCidadeUseCase.execute(cidadeId, request.body);
          return {
            statusCode: 200,
            body: updatedCidade
          };
      } catch (error) {
          logger.error("Erro ao atualizar cidade", {
                  correlationId,
                  route: "UpdateCidadeController",
                  error,
                });
          
                return mapErrorToHttpResponse(error, correlationId);
      }
    }
}