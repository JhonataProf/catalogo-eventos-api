// modules/media/infra/storage/s3-media.storage.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { MediaStorageService } from "../../domain/services/media-storage.service";

export class S3MediaStorage implements MediaStorageService {
  private readonly s3: S3Client;

  constructor(
    private readonly bucket: string,
    private readonly region: string,
    s3Client?: S3Client
  ) {
    this.s3 = s3Client ?? new S3Client({ region });
  }

  async save(params: {
    buffer: Buffer;
    folder: string;
    filename: string;
    contentType?: string;
    public?: boolean;
  }): Promise<{ path: string }> {
    const key = `${params.folder}/${params.filename}`.replace(/\/+/g, "/");

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: params.buffer,
        ContentType: params.contentType ?? "application/octet-stream",
        // se você quiser público (não recomendo por padrão)
        ACL: params.public ? "public-read" : undefined,
      })
    );

    // URL padrão do S3 (pode trocar por CloudFront depois)
    const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    return { path: url };
  }
}