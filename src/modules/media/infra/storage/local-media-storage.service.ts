// src/modules/media/infra/storage/local-media-storage.service.ts
import path from "path";
import crypto from "crypto";
import {
  ensureDir,
  joinFs,
  joinPublicPath,
  normalizeFolder,
  writeBufferFile,
} from "@/core/config/paths";
import {
  MediaStorageService,
  SaveMediaInput,
  SaveMediaOutput,
} from "../../domain/services/media-storage.service";

export interface LocalMediaStorageConfig {
  rootDir: string; // ex: path.resolve(process.cwd(), "uploads")
  publicBasePath?: string; // ex: "/uploads"
}

export class LocalMediaStorageService implements MediaStorageService {
  constructor(private readonly cfg: LocalMediaStorageConfig) {}

  async save(input: SaveMediaInput): Promise<SaveMediaOutput> {
    const ext = path.extname(input.filename) || "";
    const safeName = crypto.randomUUID() + ext;

    const folder = normalizeFolder(input.folder);
    const dir = joinFs(this.cfg.rootDir, folder);

    await ensureDir(dir);

    const filePath = path.join(dir, safeName);
    await writeBufferFile(filePath, input.buffer);

    const logicalPath = this.cfg.publicBasePath
      ? joinPublicPath(this.cfg.publicBasePath, folder, safeName)
      : filePath;

    return {
      path: logicalPath,
      size: input.buffer.length,
      mimeType: input.mimeType,
    };
  }
}