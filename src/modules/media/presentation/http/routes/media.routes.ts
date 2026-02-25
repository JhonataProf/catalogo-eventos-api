// modules/media/presentation/http/routes/media.routes.ts
import { Router } from "express";
import { makeUploadMediaController } from "../controllers/upload-media.factory";

export function registerMediaRoutes(router: Router) {
  const controller = makeUploadMediaController();
  router.post("/api/media/upload", (req, res) => controller.handle(req, res));
}