// src/modules/events/presentation/http/factories/make-update-event.controller.ts
import { SequelizeEventRepository } from "@/modules/events/infra/repositories/sequelize-event.repository";
import { UpdateEventUseCase } from "@/modules/events/application/use-cases/update-event.usecase";
import { UpdateEventController } from "../controllers/update-event.controller";
import { FindCidadeByIdUseCase } from "@/modules/cidades/application/use-cases/find-cidade-by-id.usecase";
import { SequelizeCidadeRepository } from "@/modules/cidades/infra/sequelize/sequelize-city.repository";

export function makeUpdateEventController() {
  const repo = new SequelizeEventRepository();
  const cidadeRepo = new SequelizeCidadeRepository();
  const usecaseFindCidadeById = new FindCidadeByIdUseCase(cidadeRepo);
  const useCase = new UpdateEventUseCase(repo, repo, usecaseFindCidadeById);
  return new UpdateEventController(useCase);
}