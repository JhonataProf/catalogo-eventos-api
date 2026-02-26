// modules/media/application/dto/upload-media.dto.ts
export type Base64Media = string; // dataURL ("data:image/png;base64,...") ou base64 puro

// src/modules/media/application/dto/upload-media.dto.ts
export interface UploadMediaDTO {
  files: Array<{
    base64: string;     // pode vir "data:image/png;base64,...." ou só base64 puro
    filename: string;
    mimeType: string;
  }>;
  folder?: string;       // opcional
  visibility?: "private" | "public";
}