// src/modules/media/infra/storage/s3-media-storage.service.ts
import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";
import {
  MediaStorageService,
  SaveMediaInput,
  SaveMediaOutput,
} from "../../domain/services/media-storage.service";

export interface S3MediaStorageConfig {
  bucket: string;
  region: string;
  publicBaseUrl?: string; // ex: https://<bucket>.s3.amazonaws.com (ou CloudFront)
}

export class S3MediaStorageService implements MediaStorageService {
  private readonly client: S3Client;

  constructor(private readonly cfg: S3MediaStorageConfig) {
    this.client = new S3Client({ region: cfg.region });
  }

  async save(input: SaveMediaInput): Promise<SaveMediaOutput> {
    const ext = path.extname(input.filename) || "";
    const safeName = crypto.randomUUID() + ext;

    const folder = input.folder ? input.folder.replace(/^\//, "") : "";
    const key = folder ? `${folder}/${safeName}` : safeName;

    const isPublic = input.visibility === "public";

    const objCommand: PutObjectCommandInput = {
      Bucket: this.cfg.bucket,
      Key: key,
      Body: input.buffer,
      ContentType: input.mimeType
    }
    if(isPublic) {
      objCommand.ACL = "public-read";
    }

    const cmd = new PutObjectCommand(objCommand);
    await this.client.send(cmd);

    const url =
      isPublic && this.cfg.publicBaseUrl
        ? `${this.cfg.publicBaseUrl.replace(/\/$/, "")}/${key}`
        : undefined;

    return {
      path: `s3://${this.cfg.bucket}/${key}`,
      url,
      size: input.buffer.length,
      mimeType: input.mimeType,
    };
  }
}
