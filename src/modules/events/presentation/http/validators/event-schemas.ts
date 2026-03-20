import { z } from "zod";
import { EVENT_CATEGORIES } from "@/modules/events/domain/value-objects/event-category";

export const createEventSchema = z.object({
  cityId: z.coerce.number().int().positive("cityId é obrigatório"),
  citySlug: z.string(),
  name: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string(),
  category: z.enum(EVENT_CATEGORIES, {
    error: (issue) => `Categoria ${String(issue.input)} é inválida`,
  }),
  startDate: z.date("Data inicial é obrigatória"),
  endDate: z.date("Data inicial é obrigatória"),
  formattedDate: z.string().min(10, "Hora é obrigatória"),
  location: z.string().min(3, "Local é obrigatório"),
  imageUrl: z.url("img deve ser uma URL válida"),
  featured: z.boolean().default(true),
  published: z.boolean().default(true),
});

export const updateEventSchema = createEventSchema.partial();