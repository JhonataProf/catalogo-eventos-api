import { registerAuthRoutes } from "@/modules/auth/presentation/http/routes/auth.routes";
import { registerUserRoutes } from "@/modules/users/presentation/http/routes/user.routes";
import { Express, Router } from "express";

export default function setupRoutes(app: Express): void {
  const router = Router();

  app.use("/api", router);

  registerAuthRoutes(router);
  registerUserRoutes(router);

  // pratos/pedidos depois
}
