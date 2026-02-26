// src/modules/media/presentation/http/validators/media-schemas.ts
import { z } from "zod";

export const uploadMediaSchema = z.object({
  files: z
    .array(
      z.object({
        base64: z.string().min(10, "base64 inválido"),
        filename: z.string().min(1, "filename é obrigatório"),
        mimeType: z.string().min(3, "mimeType é obrigatório"),
      })
    )
    .min(1, "Envie pelo menos 1 arquivo"),
  folder: z.string().optional(),
  visibility: z.enum(["private", "public"]).optional(),
});