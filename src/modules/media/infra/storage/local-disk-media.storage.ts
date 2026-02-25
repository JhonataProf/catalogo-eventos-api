// modules/media/infra/storage/local-disk-media.storage.ts
import fs from "fs/promises";
import path from "path";
import { MediaStorageService } from "../../domain/services/media-storage.service";

export class LocalDiskMediaStorage implements MediaStorageService {
  constructor(
    private readonly baseDir = path.resolve(process.cwd(), "public") // ex: /public/uploads/...
  ) {}

  async save(params: {
    buffer: Buffer;
    folder: string;
    filename: string;
    contentType?: string;
    public?: boolean;
  }): Promise<{ path: string }> {
    const dir = path.join(this.baseDir, params.folder);
    await fs.mkdir(dir, { recursive: true });

    const absolute = path.join(dir, params.filename);
    await fs.writeFile(absolute, params.buffer);

    // path "exposto" (ex: você pode servir /public via express.static)
    const publicPath = `/${params.folder}/${params.filename}`.replace(/\/+/g, "/");
    return { path: publicPath };
  }
}