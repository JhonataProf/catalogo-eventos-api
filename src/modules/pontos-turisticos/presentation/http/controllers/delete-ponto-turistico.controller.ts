import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { noContent } from "@/core/http/http-resource";
import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse } from "@/core/http/http-error-response";
import { DeletePontoTuristicoUseCase } from "../../../application/use-cases/delete-ponto-turistico.usecase";

export class DeletePontoTuristicoController implements Controller {
  constructor(private readonly useCase: DeletePontoTuristicoUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const correlationId = req.correlationId;

    try {
      const id = Number(req.params?.id);
      await this.useCase.execute(id);
      return noContent();
    } catch (error) {
      logger.error("Erro ao deletar ponto turístico", {
        correlationId,
        route: "DeletePontoTuristicoController",
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}