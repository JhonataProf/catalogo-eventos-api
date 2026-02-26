// src/modules/media/presentation/http/controllers/factories/upload-media.controller.factory.ts
import path from "path";
import { ENV } from "@/core/config/env";
import { Controller } from "@/core/protocols";
import { UploadMediaUseCase } from "@/modules/media/application/use-cases/upload-media.usecase";
import { UploadMediaController } from "../upload-media.controller";

import { LocalMediaStorageService } from "@/modules/media/infra/storage/local-media-storage.service";
import { S3MediaStorageService } from "@/modules/media/infra/storage/s3-media-storage.service";

export function UploadMediaControllerFactory(): Controller {
  const storage =
    ENV.MEDIA_STORAGE === "s3" && ENV.S3_BUCKET && ENV.AWS_REGION && ENV.S3_PUBLIC_BASE_URL
      ? new S3MediaStorageService({
          bucket: ENV.S3_BUCKET,
          region: ENV.AWS_REGION,
          publicBaseUrl: ENV.S3_PUBLIC_BASE_URL,
        })
      : new LocalMediaStorageService({
          rootDir: path.resolve(process.cwd(), "uploads"),
          publicBasePath: "/uploads",
        });

  const useCase = new UploadMediaUseCase(storage);
  return new UploadMediaController(useCase);
}