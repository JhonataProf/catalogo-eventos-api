// modules/media/domain/services/media-storage.service.ts
export interface MediaStorageService {
  save(params: {
    buffer: Buffer;
    folder: string;
    filename: string;
    contentType?: string;
    public?: boolean;
  }): Promise<{
    path: string; // local path OU url do S3
  }>;
}