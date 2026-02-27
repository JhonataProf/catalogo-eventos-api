import { AppError } from "@/core/errors-app-error";
import { DomainLogger, NoopDomainLogger } from "@/core/logger/domain-logger";
import { EventEntity } from "../../domain/entities/event.entity";
import { CreateEventDTO } from "../dto";

// ajuste os imports conforme suas interfaces reais
import { CreateEventRepository } from "../../domain/repositories/create-event.repository";
import { FindCidadeByIdUseCase } from "@/modules/cidades/application/use-cases/find-cidade-by-id.usecase";

export class CreateEventUseCase {
  constructor(
    private readonly createRepo: CreateEventRepository,
    private readonly findCidadeById: FindCidadeByIdUseCase,
    private readonly logger: DomainLogger = new NoopDomainLogger()
  ) {}

  async execute(dto: CreateEventDTO): Promise<EventEntity> {
    this.logger.info("CreateEventUseCase:start", { cidadeId: dto.cidadeId, cat: dto.cat });

    const cidade = await this.findCidadeById.execute(dto.cidadeId);
    if (!cidade) {
      throw new AppError({
        code: "CIDADE_NOT_FOUND",
        message: `Cidade ${dto.cidadeId} não encontrada`,
        statusCode: 404,
        details: { cidadeId: dto.cidadeId },
      });
    }

    const entity = new EventEntity({
      id: 0,
      ...dto,
    });

    const created = await this.createRepo.create(entity);

    this.logger.info("CreateEventUseCase:success", { id: created.id, cidadeId: created.cidadeId });
    return created;
  }
}