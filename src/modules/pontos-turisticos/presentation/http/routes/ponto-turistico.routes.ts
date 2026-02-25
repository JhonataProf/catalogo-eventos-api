import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import authMiddleware from "@/core/http/middlewares/auth-middleware";
import authorizeRoles from "@/core/http/middlewares/authorize-roles";
import {validateBody} from "@/core/http/middlewares/validate-body";

import {
  makeCreatePontoTuristicoController,
  makeDeletePontoTuristicoController,
  makeGetPontoTuristicoByIdController,
  makeListPontosTuristicosController,
  makeUpdatePontoTuristicoController,
} from "../factories/ponto-turistico-controllers.factory";

import {
  createPontoTuristicoSchema,
  updatePontoTuristicoSchema,
} from "../validators/ponto-turistico-schemas";

export function registerPontosTuristicosRoutes(router: Router) {
  const r = Router();

  r.use(authMiddleware);
  r.use(authorizeRoles(["Gerente", "Funcionario"]));

  r.post("/", validateBody(createPontoTuristicoSchema), adaptRoute(makeCreatePontoTuristicoController()));
  r.get("/", adaptRoute(makeListPontosTuristicosController()));
  r.get("/:id", adaptRoute(makeGetPontoTuristicoByIdController()));
  r.put("/:id", validateBody(updatePontoTuristicoSchema), adaptRoute(makeUpdatePontoTuristicoController()));
  r.delete("/:id", adaptRoute(makeDeletePontoTuristicoController()));

  router.use("/api/pontos-turisticos", r);
}