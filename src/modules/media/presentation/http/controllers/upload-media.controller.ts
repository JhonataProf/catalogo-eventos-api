// modules/media/presentation/http/controllers/upload-media.controller.ts
import { Request, Response } from "express";
import { UploadMediaUseCase } from "../../../application/use-cases/upload-media.usecase";

export class UploadMediaController {
  constructor(private readonly useCase: UploadMediaUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { files, folder, public: isPublic, contentTypeHint } = req.body;

      const result = await this.useCase.execute({
        files,
        folder,
        public: isPublic,
        contentTypeHint,
      });

      return res.status(201).json({
        data: { paths: result.paths },
      });
    } catch (err: any) {
      return res.status(400).json({
        error: { message: err?.message ?? "Invalid upload" },
      });
    }
  }
}