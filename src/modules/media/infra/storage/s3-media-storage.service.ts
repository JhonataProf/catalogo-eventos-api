// src/modules/media/infra/storage/s3-media-storage.service.ts
import crypto from "crypto";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { MediaStorageService, SaveMediaInput, SaveMediaOutput } from "../../domain/services/media-storage.service";

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

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.cfg.bucket,
        Key: key,
        Body: input.buffer,
        ContentType: input.mimeType,
        ACL: isPublic ? "public-read" : undefined, // se sua policy não usar ACL, remova e use policy/bucket settings
      })
    );

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