// modules/media/presentation/http/controllers/upload-media.factory.ts
import { UploadMediaUseCase } from "../../../application/use-cases/upload-media.usecase";
import { UploadMediaController } from "./upload-media.controller";
import { LocalDiskMediaStorage } from "../../../infra/storage/local-disk-media.storage";
import { S3MediaStorage } from "../../../infra/storage/s3-media.storage";

export function makeUploadMediaController() {
  const driver = process.env.MEDIA_DRIVER ?? "local";

  const storage =
    driver === "s3"
      ? new S3MediaStorage(
          process.env.MEDIA_BUCKET!,
          process.env.AWS_REGION ?? "us-east-1"
        )
      : new LocalDiskMediaStorage(); // baseDir default

  const useCase = new UploadMediaUseCase(storage);
  return new UploadMediaController(useCase);
}