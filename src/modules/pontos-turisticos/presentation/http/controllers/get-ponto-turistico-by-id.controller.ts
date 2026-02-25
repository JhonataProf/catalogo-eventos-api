import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { ok, resource } from "@/core/http/http-resource";
import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse } from "@/core/http/http-error-response";
import { pontoTuristicoLinks } from "../ponto-turistico-hateoas";
import { GetPontoTuristicoByIdUseCase } from "@/modules/pontos-turisticos/application/use-cases/get-ponto-turistico-by-id.usecase";

export class GetPontoTuristicoByIdController implements Controller {
  constructor(private readonly useCase: GetPontoTuristicoByIdUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const correlationId = req.correlationId;

    try {
      const id = Number(req.params?.id);
      const entity = await this.useCase.execute(id);

      if (!entity) {
        logger.warn("Ponto turístico não encontrado", {
          correlationId,
          route: "GetPontoTuristicoByIdController",
          id,
        });
        return mapErrorToHttpResponse(
          new Error("Ponto turístico não encontrado"),
          correlationId
        );
      }

      const data = {
        id: entity.id,
        nome: entity.nome,
        cidade: entity.cidade,
        estado: entity.estado,
        ativo: entity.ativo,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };

      return ok(resource(data, pontoTuristicoLinks(entity.id)));
    } catch (error) {
      logger.error("Erro ao buscar ponto turístico", {
        correlationId,
        route: "GetPontoTuristicoByIdController",
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}