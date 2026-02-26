// src/modules/media/application/use-cases/upload-media.usecase.ts
import { AppError } from "@/core/errors-app-error";
import { DomainLogger, NoopDomainLogger } from "@/core/logger/domain-logger";
import { MediaStorageService } from "../../domain/services/media-storage.service";
import { UploadMediaDTO } from "../dto/upload-media.dto";

function stripDataUrl(b64: string) {
  const idx = b64.indexOf("base64,");
  return idx >= 0 ? b64.slice(idx + "base64,".length) : b64;
}

export interface UploadMediaResult {
  filename: string;
  mimeType: string;
  size: number;
  path: string;
  url?: string;
}

export class UploadMediaUseCase {
  constructor(
    private readonly storage: MediaStorageService,
    private readonly logger: DomainLogger = new NoopDomainLogger()
  ) {}

  async execute(dto: UploadMediaDTO): Promise<UploadMediaResult> {
    this.logger.info("UploadMediaUseCase: start", {
      folder: dto.folder,
      visibility: dto.visibility,
      filename: dto.file?.filename,
    });

    if (!dto.file) {
      throw new AppError({
        code: "MEDIA_EMPTY",
        message: "Nenhum arquivo enviado",
        statusCode: 400,
      });
    }

    const raw = stripDataUrl(dto.file.base64);
    const buffer = Buffer.from(raw, "base64");

    if (!buffer.length) {
      throw new AppError({
        code: "MEDIA_INVALID_BASE64",
        message: "Arquivo vazio ou base64 inválido",
        statusCode: 400,
      });
    }

    const saved = await this.storage.save({
      filename: dto.file.filename,
      mimeType: dto.file.mimeType,
      buffer,
      folder: dto.folder,
      visibility: dto.visibility,
    });

    this.logger.info("UploadMediaUseCase: done", {
      path: saved.path,
      size: saved.size,
    });

    return {
      filename: dto.file.filename,
      mimeType: saved.mimeType,
      size: saved.size,
      path: saved.path,
      url: saved.url,
    };
  }
}