// src/modules/events/presentation/http/validators/event-schemas.ts
import { z } from "zod";
import { EVENT_CATEGORIES } from "@/modules/events/domain/value-objects/event-category";

export const createEventSchema = z.object({
  titulo: z.string().min(3, "Titulo deve ter pelo menos 3 caracteres"),
  cat: z.enum(EVENT_CATEGORIES as any),
  data: z.string().min(8),
  hora: z.string().min(3),
  local: z.string().min(3),
  preco: z.string().min(1),
  img: z.url("img deve ser uma URL válida"),
  desc: z.string().min(3),
  cidadeId: z.number().int().positive(),
});

export const updateEventSchema = createEventSchema.partial();