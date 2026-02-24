// modules/media/application/dto/upload-media.dto.ts
export type Base64Media = string; // dataURL ("data:image/png;base64,...") ou base64 puro

export interface UploadMediaDTO {
  files: Base64Media | Base64Media[];
  folder?: string;              // ex: "users/avatars"
  public?: boolean;             // no S3, gera URL pública (ou não)
  contentTypeHint?: string;     // opcional: "image/png"
}