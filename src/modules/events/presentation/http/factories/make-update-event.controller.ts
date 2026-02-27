// src/modules/events/presentation/http/factories/make-update-event.controller.ts
import { SequelizeEventRepository } from "@/modules/events/infra/repositories/sequelize-event.repository";
import { UpdateEventUseCase } from "@/modules/events/application/use-cases/update-event.usecase";
import { UpdateEventController } from "../controllers/update-event.controller";

export function makeUpdateEventController() {
  const repo = new SequelizeEventRepository();
  const useCase = new UpdateEventUseCase(repo, repo);
  return new UpdateEventController(useCase);
}