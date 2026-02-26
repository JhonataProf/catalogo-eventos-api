// src/modules/events/infra/repositories/sequelize-event.repository.ts
import { Op, Transaction } from "sequelize";
import EventModel from "../model/event-model";
import { EventEntity } from "../../domain/entities/event.entity";
import { CreateEventRepository } from "../../domain/repositories/create-event.repository";
import { DeleteEventRepository } from "../../domain/repositories/delete-event.repository";
import { FindEventByIdRepository } from "../../domain/repositories/find-event-by-id.repository";
import { ListEventsRepository, ListEventsQuery, PaginatedResult } from "../../domain/repositories/list-events.repository";
import { UpdateEventRepository } from "../../domain/repositories/update-event.repository";

// ajuste estes imports conforme o seu core
import { SpecificationBuilder } from "@/core/domain/specification/specification-builder";
import { eq, like } from "@/core/domain/specification/builders";

const ALLOWED_SORT_FIELDS = new Set([
  "id",
  "titulo",
  "cat",
  "data",
  "hora",
  "cidadeId",
  "createdAt",
  "updatedAt",
]);

export class SequelizeEventRepository
  implements
    CreateEventRepository,
    FindEventByIdRepository,
    ListEventsRepository,
    UpdateEventRepository,
    DeleteEventRepository
{
  private toEntity(m: EventModel): EventEntity {
    return new EventEntity({
      id: m.id,
      titulo: m.titulo,
      cat: m.cat as any,
      data: m.data,
      hora: m.hora,
      local: m.local,
      preco: m.preco,
      img: m.img,
      desc: m.desc,
      cidadeId: m.cidadeId,
      createdAt: (m as any).createdAt,
      updatedAt: (m as any).updatedAt,
    });
  }

  async create(event: EventEntity, t?: Transaction): Promise<EventEntity> {
    const created = await EventModel.create(
      {
        titulo: event.titulo,
        cat: event.cat,
        data: event.data,
        hora: event.hora,
        local: event.local,
        preco: event.preco,
        img: event.img,
        desc: event.desc,
        cidadeId: event.cidadeId,
      },
      { transaction: t }
    );

    return this.toEntity(created);
  }

  async findById(id: number): Promise<EventEntity | null> {
    const found = await EventModel.findByPk(id);
    return found ? this.toEntity(found) : null;
  }

  async update(id: number, data: Partial<EventEntity["props"]>, t?: Transaction): Promise<EventEntity | null> {
    const found = await EventModel.findByPk(id);
    if (!found) return null;

    await found.update(
      {
        titulo: data.titulo ?? found.titulo,
        cat: (data as any).cat ?? found.cat,
        data: data.data ?? found.data,
        hora: data.hora ?? found.hora,
        local: data.local ?? found.local,
        preco: data.preco ?? found.preco,
        img: data.img ?? found.img,
        desc: data.desc ?? found.desc,
        cidadeId: data.cidadeId ?? found.cidadeId,
      },
      { transaction: t }
    );

    return this.toEntity(found);
  }

  async delete(id: number, t?: Transaction): Promise<boolean> {
    const deleted = await EventModel.destroy({ where: { id }, transaction: t });
    return deleted > 0;
  }

  async list(query: ListEventsQuery): Promise<PaginatedResult<EventEntity>> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 10)));
    const offset = (page - 1) * limit;

    const sortBy = ALLOWED_SORT_FIELDS.has(String(query.sortBy)) ? String(query.sortBy) : "createdAt";
    const sortDir = (String(query.sortDir ?? "desc").toLowerCase() === "asc" ? "asc" : "desc") as "asc" | "desc";

    // Builder de specs (sem if no usecase)
    const builder = new SpecificationBuilder<ListEventsQuery>()
      .add((p) => (p.titulo ? like("titulo", p.titulo) : null))
      .add((p) => (p.cat ? eq("cat", p.cat) : null))
      .add((p) => (typeof p.cidadeId === "number" ? eq("cidadeId", p.cidadeId) : null));

    const spec = builder.build({
      ...query,
      cidadeId: query.cidadeId !== undefined ? Number(query.cidadeId) : undefined,
    });

    const where = spec ? spec.toSequelizeWhere() : {};

    const { rows, count } = await EventModel.findAndCountAll({
      where,
      order: [[sortBy, sortDir]],
      limit,
      offset,
    });

    const total = typeof count === "number" ? count : 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      items: rows.map((r) => this.toEntity(r)),
      page,
      limit,
      total,
      totalPages,
      sort: { by: sortBy, dir: sortDir },
    };
  }
}