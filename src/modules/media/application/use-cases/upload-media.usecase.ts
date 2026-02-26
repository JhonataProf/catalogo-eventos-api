// src/modules/media/application/use-cases/upload-media.usecase.ts
import { AppError } from "@/core/errors-app-error";
import { DomainLogger, NoopDomainLogger } from "@/core/logger/domain-logger";
import { MediaStorageService } from "../../domain/services/media-storage.service";
import { UploadMediaDTO } from "../dto/upload-media.dto";

function stripDataUrl(b64: string) {
  // aceita "data:...;base64,XXXXX"
  const idx = b64.indexOf("base64,");
  return idx >= 0 ? b64.slice(idx + "base64,".length) : b64;
}

export interface UploadMediaResult {
  items: Array<{
    filename: string;
    mimeType: string;
    size: number;
    path: string;
    url?: string;
  }>;
}

export class UploadMediaUseCase {
  constructor(
    private readonly storage: MediaStorageService,
    private readonly logger: DomainLogger = new NoopDomainLogger()
  ) {}

  async execute(dto: UploadMediaDTO): Promise<UploadMediaResult> {
    this.logger.info("UploadMediaUseCase: start", {
      files: dto.files?.length ?? 0,
      folder: dto.folder,
      visibility: dto.visibility,
    });

    if (!dto.files?.length) {
      throw new AppError({
        code: "MEDIA_EMPTY",
        message: "Nenhum arquivo enviado",
        statusCode: 400,
      });
    }

    const items = [];
    for (const f of dto.files) {
      const raw = stripDataUrl(f.base64);
      const buffer = Buffer.from(raw, "base64");
      if (!buffer.length) {
        throw new AppError({
          code: "MEDIA_INVALID_BASE64",
          message: `Arquivo ${f.filename} está vazio ou inválido`,
          statusCode: 400,
        });
      }

      const saved = await this.storage.save({
        filename: f.filename,
        mimeType: f.mimeType,
        buffer,
        folder: dto.folder,
        visibility: dto.visibility,
      });

      items.push({
        filename: f.filename,
        mimeType: saved.mimeType,
        size: saved.size,
        path: saved.path,
        url: saved.url,
      });
    }

    this.logger.info("UploadMediaUseCase: done", { count: items.length });
    return { items };
  }
}