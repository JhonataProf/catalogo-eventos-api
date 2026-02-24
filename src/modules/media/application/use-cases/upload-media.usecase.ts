// modules/media/application/use-cases/upload-media.usecase.ts
import { MediaStorageService } from "../../domain/services/media-storage.service";
import { UploadMediaDTO } from "../dto/upload-media.dto";
import { normalizeToArray, parseBase64 } from "../helpers/base64";

export class UploadMediaUseCase {
  constructor(private readonly storage: MediaStorageService) {}

  async execute(dto: UploadMediaDTO): Promise<{ paths: string[] }> {
    const folder = (dto.folder ?? "uploads").replace(/^\/+|\/+$/g, "");
    const files = normalizeToArray(dto.files);

    const results: string[] = [];

    for (const file of files) {
      const { buffer, contentType, hash } = parseBase64(file);

      // nome determinístico (bom p/ dedup), mas você pode usar uuid também
      const ext = guessExtension(dto.contentTypeHint ?? contentType);
      const filename = `${hash}${ext ? `.${ext}` : ""}`;

      const saved = await this.storage.save({
        buffer,
        folder,
        filename,
        contentType: dto.contentTypeHint ?? contentType,
        public: dto.public ?? false,
      });

      results.push(saved.path);
    }

    return { paths: results };
  }
}

function guessExtension(contentType?: string) {
  switch (contentType) {
    case "image/png": return "png";
    case "image/jpeg": return "jpg";
    case "image/webp": return "webp";
    case "video/mp4": return "mp4";
    default: return "";
  }
}