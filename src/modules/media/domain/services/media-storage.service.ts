// src/modules/media/domain/services/media-storage.service.ts
export type MediaVisibility = "private" | "public";

export interface SaveMediaInput {
  filename: string;        // ex: "foto.png"
  mimeType: string;        // ex: "image/png"
  buffer: Buffer;          // conteúdo
  visibility?: MediaVisibility;
  folder?: string;         // ex: "users/10"
}

export interface SaveMediaOutput {
  path: string;            // caminho lógico (ex: "/uploads/..") ou s3 key
  url?: string;            // quando for S3 público, ou URL assinada se quiser
  size: number;
  mimeType: string;
}

export interface MediaStorageService {
  save(input: SaveMediaInput): Promise<SaveMediaOutput>;
}