import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { CreateHomeBannerUseCase } from "@/modules/home-banners/application/use-cases";
import { created, mapErrorToHttpResponse, ResourceBuilder } from "@/core/http";
import { logger } from "@/core/config/logger";
import { CreateHomeBannerDTO } from "@/modules/home-banners/application/dto";
import { homeBannerLinks } from "../home-banners-hateoas";
import { toHomeBannerHttpPayload } from "../mappers/home-banner-response.mapper";
import { AppError } from "@/core/errors-app-error";

export class CreateHomeBannerController implements Controller {
    constructor(private readonly usecase: CreateHomeBannerUseCase) {}
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const correlationId = httpRequest.correlationId;
        try {
            const homeBanner = httpRequest.body as CreateHomeBannerDTO;
            const result = await this.usecase.execute(homeBanner);
            if (!result) {
                return mapErrorToHttpResponse(
                    new AppError({
                        code: "HOME_BANNER_CREATE_FAILED",
                        message: "Erro ao criar banner",
                        statusCode: 500,
                    }),
                    correlationId,
                );
            }
            const payload = toHomeBannerHttpPayload(result);
            const resource = new ResourceBuilder(payload)
                .addAllLinks(homeBannerLinks(payload.id))
                .addMeta({ correlationId, version: "1.0.0" })
                .build();
            return created(resource);
        } catch (error) {
            logger.error("CreateHomeBannerController: erro ao criar", {
                correlationId,
                error,
            });
            return mapErrorToHttpResponse(error, correlationId);
        }
    }
}