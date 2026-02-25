import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse } from "@/core/http/http-error-response";
import { ok, resource } from "@/core/http/http-resource";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { UpdatePontoTuristicoUseCase } from "../../../application/use-cases/update-ponto-turistico.usecase";
import { pontoTuristicoLinks } from "../ponto-turistico-hateoas";

export class UpdatePontoTuristicoController implements Controller {
  constructor(private readonly useCase: UpdatePontoTuristicoUseCase) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const correlationId = req.correlationId;

    try {
      const id = Number(req.params?.id);
      const updated = await this.useCase.execute(id, { ...req.body });

      if (!updated || !updated.id) {
        logger.warn(
          "UpdatePontoTuristicoController: entidade atualizada é nula",
          {
            correlationId,
            route: "UpdatePontoTuristicoController",
          },
        );
        return mapErrorToHttpResponse(
          new Error("Erro ao atualizar ponto turístico"),
          correlationId,
        );
      }

      const data = {
        id: updated.id,
        nome: updated.nome,
        cidade: updated.cidade,
        estado: updated.estado,
        ativo: updated.ativo,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      };

      return ok(resource(data, pontoTuristicoLinks(updated.id)));
    } catch (error) {
      logger.error("Erro ao atualizar ponto turístico", {
        correlationId,
        route: "UpdatePontoTuristicoController",
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
