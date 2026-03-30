import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { DeleteHomeBannerUseCase } from "@/modules/home-banners/application/use-cases";
import { AppError } from "@/core/errors-app-error";
import { logger } from "@/core/config/logger";
import { mapErrorToHttpResponse } from "@/core/http";

export class DeleteHomeBannerController implements Controller {
  constructor(private readonly usecase: DeleteHomeBannerUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const correlationId = httpRequest.correlationId;
    try {
      const id = Number(httpRequest.pathParams?.id);
      const deleted = await this.usecase.execute(id);
      if (!deleted) {
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
      return {
        statusCode: 200,
        body: {
          data: { deleted },
          links: {},
          meta: { correlationId, version: "1.0.0" },
        },
      };
    } catch (error) {
      logger.error("DeleteHomeBannerController: erro ao excluir", {
        correlationId,
        error,
      });
      return mapErrorToHttpResponse(error, correlationId);
    }
  }
}
