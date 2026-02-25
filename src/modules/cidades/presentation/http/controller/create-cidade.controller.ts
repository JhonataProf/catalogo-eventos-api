import { created, mapErrorToHttpResponse, resource } from "@/core/http";
import { logger } from "@/core/logger";
import { Controller, HttpRequest } from "@/core/protocols";
import { CreateCidadeDTO } from "@/modules/cidades/application/dto";
import { CreateCidadeUseCase } from "@/modules/cidades/application/use-cases/create-cidade.usecase";
import { cidadeLinks } from "../cidade-hateoas";

export class CreateCidadeController implements Controller {
  constructor(private readonly createCidadeUseCase: CreateCidadeUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<any> {
    const correlationId = httpRequest.correlationId;
    logger.info("Iniciando criação de cidade", {
      correlationId,
      route: "CreateCidadeController",
      body: httpRequest.body,
    });
    try {
      const body = httpRequest.body as CreateCidadeDTO;
      const cidade = await this.createCidadeUseCase.execute(body);
      const resourceResp = resource(
        {
          id: cidade.id,
          nome: cidade.nome,
          uf: cidade.uf,
          desc: cidade.desc,
        },
        cidadeLinks(cidade.id),
        {
          version: "1.0.0",
        },
      );

      logger.info("Cidade criada com sucesso", {
        correlationId,
        route: "CreateCidadeController",
        cidadeId: cidade.id,
        nome: cidade.nome,
      });

      return created(resourceResp);
    } catch (error) {
      logger.error("Erro ao criar cidade", {
        correlationId,
        route: "CreateCidadeController",
        error,
      });

      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
