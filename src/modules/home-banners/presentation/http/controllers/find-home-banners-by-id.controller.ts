import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { FindHomeBannerByIdUseCase } from "@/modules/home-banners/application/use-cases";
import { AppError } from "@/core/errors-app-error";
import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse, ok, ResourceBuilder } from "@/core/http";
import { homeBannerLinks } from "../home-banners-hateoas";
import { toHomeBannerHttpPayload } from "../mappers/home-banner-response.mapper";

export class FindHomeBannerByIdController implements Controller {
  constructor(private readonly usecase: FindHomeBannerByIdUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const correlationId = httpRequest.correlationId;
    try {
      const id = Number(httpRequest.pathParams?.id);
      const result = await this.usecase.execute(id);
      if (!result) {
        return mapErrorToHttpResponse(
          new AppError({
            code: "HOME_BANNER_NOT_FOUND",
            message: "Banner não encontrado",
            statusCode: 404,
            details: { id },
          }),
          correlationId,
        );
      }
      const payload = toHomeBannerHttpPayload(result);
      const resource = new ResourceBuilder(payload)
        .addAllLinks(homeBannerLinks(payload.id))
        .addMeta({ correlationId, version: "1.0.0" })
        .build();
      return ok(resource);
    } catch (error) {
      logger.error("FindHomeBannerByIdController: erro ao buscar", {
        correlationId,
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
