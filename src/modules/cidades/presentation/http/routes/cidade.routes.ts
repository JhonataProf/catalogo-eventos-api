import adaptRoute from "@/core/adapters/express-route-adapter";
import { Router } from "express-serve-static-core";
import {
  CreateCidadeController,
  DeleteCidadeController,
  ListCidadeController,
  UpdateCidadeController,
} from "../controller";
import { FindCidadeByIdController } from "../controller/find-cidade-by-id.controller";
import { CreateCidadeUseCase } from "@/modules/cidades/application/use-cases";
import { SequelizeCidadeRepository } from "@/modules/cidades/infra/sequelize/sequelize-city.repository";

export function registerCidadeRoutes(router: Router): void {
  const cidadeRepo = new SequelizeCidadeRepository();
  const createCidadeUseCase = new CreateCidadeUseCase(cidadeRepo, cidadeRepo)
  router.post("/cidades", adaptRoute(new CreateCidadeController(createCidadeUseCase)));
  router.get("/cidades", adaptRoute(new ListCidadeController()));
  router.put("/cidades/:id", adaptRoute(new UpdateCidadeController()));
  router.delete("/cidades/:id", adaptRoute(new DeleteCidadeController()));
  router.get("/cidades/:id", adaptRoute(new FindCidadeByIdController()));
}
