import adaptRoute from "@/core/adapters/express-route-adapter";
import { Router } from "express-serve-static-core";
import {
  CreateCidadeController,
  DeleteCidadeController,
  ListCidadeController,
  UpdateCidadeController,
} from "../controller";
import { FindCidadeByIdController } from "../controller/find-cidade-by-id.controller";
import {
  CreateCidadeUseCase,
  DeleteCidadeUseCase,
  ListCidadeUseCase,
  UpdateCidadeUseCase,
} from "@/modules/cidades/application/use-cases";
import { SequelizeCidadeRepository } from "@/modules/cidades/infra/sequelize/sequelize-city.repository";
import { FindCidadeByIdUseCase } from "@/modules/cidades/application/use-cases/find-cidade-by-id.usecase";

export function registerCidadeRoutes(router: Router): void {
  const cidadeRepo = new SequelizeCidadeRepository();
  const createCidadeUseCase = new CreateCidadeUseCase(cidadeRepo, cidadeRepo);
  const listCidadeUseCase = new ListCidadeUseCase(cidadeRepo);
  const updateCidadeUseCase = new UpdateCidadeUseCase(cidadeRepo);
  const deleteCidadeUseCase = new DeleteCidadeUseCase(cidadeRepo);
  const findCidadeByIdUseCase = new FindCidadeByIdUseCase(cidadeRepo);

  router.post(
    "/cidades",
    adaptRoute(new CreateCidadeController(createCidadeUseCase)),
  );
  router.get(
    "/cidades",
    adaptRoute(new ListCidadeController(listCidadeUseCase)),
  );
  router.put(
    "/cidades/:id",
    adaptRoute(new UpdateCidadeController(updateCidadeUseCase)),
  );
  router.delete(
    "/cidades/:id",
    adaptRoute(new DeleteCidadeController(deleteCidadeUseCase)),
  );
  router.get(
    "/cidades/:id",
    adaptRoute(new FindCidadeByIdController(findCidadeByIdUseCase)),
  );
}
