import { CreateEventController } from "../controllers/create-event.controller";
import { CreateEventUseCase } from "@/modules/events/application/use-cases/create-event.usecase";

// infra
import { SequelizeEventRepository } from "@/modules/events/infra/repositories/sequelize-event.repository";
import { NoopDomainLogger } from "@/core/logger/domain-logger";
import { SequelizeCidadeRepository } from "@/modules/cidades/infra/sequelize/sequelize-city.repository";
import { FindCidadeByIdUseCase } from "@/modules/cidades/application/use-cases/find-cidade-by-id.usecase";

export function makeCreateEventController() {
  const eventRepo = new SequelizeEventRepository();
  const cidadeRepo = new SequelizeCidadeRepository(); // ou repo do módulo de cidades
  const cidadeUseCase = new FindCidadeByIdUseCase(cidadeRepo);
  const usecase = new CreateEventUseCase(eventRepo, cidadeUseCase, new NoopDomainLogger());
  return new CreateEventController(usecase);
}