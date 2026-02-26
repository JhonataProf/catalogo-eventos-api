// src/modules/media/infra/storage/local-media-storage.service.ts
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { MediaStorageService, SaveMediaInput, SaveMediaOutput } from "../../domain/services/media-storage.service";

export interface LocalMediaStorageConfig {
  rootDir: string;    // ex: path.resolve(process.cwd(), "uploads")
  publicBasePath?: string; // ex: "/uploads" se você expor estaticamente
}

export class LocalMediaStorageService implements MediaStorageService {
  constructor(private readonly cfg: LocalMediaStorageConfig) {}

  async save(input: SaveMediaInput): Promise<SaveMediaOutput> {
    const ext = path.extname(input.filename) || "";
    const safeName = crypto.randomUUID() + ext;

    const folder = input.folder ? input.folder.replace(/^\//, "") : "";
    const dir = path.join(this.cfg.rootDir, folder);

    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, safeName);
    await fs.writeFile(filePath, input.buffer);

    const logicalPath = this.cfg.publicBasePath
      ? path.posix.join(this.cfg.publicBasePath, folder.split(path.sep).join("/"), safeName)
      : filePath;

    return {
      path: logicalPath,
      size: input.buffer.length,
      mimeType: input.mimeType,
    };
  }
}