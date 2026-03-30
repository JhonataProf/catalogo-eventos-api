import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { UpdateHomeBannerUseCase } from "@/modules/home-banners/application/use-cases";
import { AppError } from "@/core/errors-app-error";
import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse, ok, ResourceBuilder } from "@/core/http";
import { homeBannerLinks } from "../home-banners-hateoas";
import { toHomeBannerHttpPayload } from "../mappers/home-banner-response.mapper";
import { UpdateHomeBannerDTO } from "@/modules/home-banners/application/dto";

export class UpdateHomeBannerController implements Controller {
  constructor(private readonly usecase: UpdateHomeBannerUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const correlationId = httpRequest.correlationId;
    try {
      const homeBanner = httpRequest.body as UpdateHomeBannerDTO;
      const id = Number(httpRequest.pathParams?.id);
      const result = await this.usecase.execute(id, homeBanner);
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
      logger.error("UpdateHomeBannerController: erro ao atualizar", {
        correlationId,
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
