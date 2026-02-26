// src/modules/events/presentation/http/routes/events.routes.ts
import { Router } from "express";
import adaptRoute from "@/core/adapters/express-route-adapter";
import { makeListEventsController } from "../factories/list-events-controller.factory";

export function registerEventRoutes(router: Router) {
  router.get("/api/eventos", adaptRoute(makeListEventsController()));

  // opcional: listar por cidadeId como rota dedicada
  router.get("/api/cidades/:cidadeId/eventos", (req, res, next) => {
    // reaproveita o mesmo controller via query:
    (req as any).query = { ...(req as any).query, cidadeId: req.params.cidadeId };
    return (adaptRoute(makeListEventsController()) as any)(req, res, next);
  });

  // TODO: POST/PUT/DELETE/GET by id com middlewares de auth/validateBody, igual outros módulos
}