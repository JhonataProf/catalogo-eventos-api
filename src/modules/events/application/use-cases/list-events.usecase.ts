// src/modules/events/application/use-cases/list-events.usecase.ts
import { ListEventsRepository, ListEventsQuery } from "../../domain/repositories/list-events.repository";

export class ListEventsUseCase {
  constructor(private readonly repo: ListEventsRepository) {}

  async execute(query: ListEventsQuery) {
    return this.repo.list(query);
  }
}