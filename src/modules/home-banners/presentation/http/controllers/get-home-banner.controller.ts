import { Controller, HttpRequest, HttpResponse } from "@/core/protocols";
import { GetHomeBannerUseCase } from "@/modules/home-banners/application/use-cases";
import { CollectionResourceBuilder, mapErrorToHttpResponse, ok } from "@/core/http";
import { logger } from "@/core/config/logger";
import { homeBannersCollectionLinks } from "../home-banners-hateoas";
import { toHomeBannerHttpPayload } from "../mappers/home-banner-response.mapper";

export class GetHomeBannerController implements Controller {
    constructor(private readonly usecase: GetHomeBannerUseCase) {}
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const correlationId = httpRequest.correlationId;
        try {
            const result = await this.usecase.execute();
            const items = (result ?? []).map(toHomeBannerHttpPayload);
            const resource = new CollectionResourceBuilder(items)
                .addAllLinks(homeBannersCollectionLinks())
                .addMeta({ correlationId, version: "1.0.0" })
                .build();
            return ok(resource);
        } catch (error) {
            logger.error("GetHomeBannerController: erro ao listar", {
                correlationId,
                error,
            });
            return mapErrorToHttpResponse(error, correlationId);
        }
    }
}