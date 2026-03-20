import { logger } from "@/core/config/logger";
import { notFound } from "@/core/helpers/http-helper";
import { mapErrorToHttpResponse, ok, ResourceBuilder } from "@/core/http";
import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { FindCityByIdUseCase } from "@/modules/cities/application/use-cases/find-city-by-id.usecase";
import { CityEntity } from "@/modules/cities/domain/entities/city.entity";
import { adminCityLinks } from "../city-hateoas";

export class FindCityByIdController implements Controller {
  constructor(private readonly findCityByIdUseCase: FindCityByIdUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const correlationId = request.correlationId;
    try {
      const cityId = Number(request.params?.id);
      const city = await this.findCityByIdUseCase.execute(cityId);
      if (!city) return notFound(city);
      const resourceBuild = new ResourceBuilder<CityEntity>(city);
      const resource = resourceBuild
        .addAllLinks(adminCityLinks(city.id))
        .addMeta({ correlationId, version: "1.0.0" })
        .build();
      return ok(resource);
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
