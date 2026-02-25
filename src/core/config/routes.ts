import { registerAuthRoutes } from "@/modules/auth/presentation/http/routes/auth.routes";
import { registerCidadeRoutes } from "@/modules/cidades/presentation/http/routes/cidade.routes";
import { registerPontosTuristicosRoutes } from "@/modules/pontos-turisticos/presentation/http/routes/ponto-turistico.routes";
import { registerUserRoutes } from "@/modules/users/presentation/http/routes/user.routes";
import { Express, Router } from "express";
import { register } from "module";

export default function setupRoutes(app: Express): void {
  const router = Router();

  app.use("/api", router);

  registerAuthRoutes(router);
  registerUserRoutes(router);
  registerPontosTuristicosRoutes(router);
  registerCidadeRoutes(router);

  // pratos/pedidos depois
}
