import adaptRoute from "@/core/adapters/express-route-adapter";
import { validateBody } from "@/core/http/middlewares/validate-body";
import { Router } from "express";

import {
  makeCreatePontoTuristicoController,
  makeDeletePontoTuristicoController,
  makeGetPontoTuristicoByIdController,
  makeListPontosTuristicosController,
  makeUpdatePontoTuristicoController,
} from "../factories/ponto-turistico-controllers.factory";

import { authMiddleware } from "@/core/http/middlewares";
import {
  createPontoTuristicoSchema,
  updatePontoTuristicoSchema,
} from "../validators/ponto-turistico-schemas";

export function registerPontosTuristicosRoutes(router: Router) {
  router.post(
    "/pontos-turisticos",
    validateBody(createPontoTuristicoSchema),
    adaptRoute(makeCreatePontoTuristicoController()),
  );
  router.get("/pontos-turisticos", adaptRoute(makeListPontosTuristicosController()));
  router.get("/pontos-turisticos/:id", adaptRoute(makeGetPontoTuristicoByIdController()));
  router.put(
    "/pontos-turisticos/:id",
    validateBody(updatePontoTuristicoSchema),
    adaptRoute(makeUpdatePontoTuristicoController()),
  );
  router.delete(
    "/pontos-turisticos/:id",
    authMiddleware,
    adaptRoute(makeDeletePontoTuristicoController()),
  );
}
