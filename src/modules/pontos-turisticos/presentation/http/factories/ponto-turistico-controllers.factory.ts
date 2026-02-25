import { Controller } from "@/core/protocols";
import {
  makeCreatePontoTuristicoUseCase,
  makeDeletePontoTuristicoUseCase,
  makeGetPontoTuristicoByIdUseCase,
  makeListPontosTuristicosUseCase,
  makeUpdatePontoTuristicoUseCase,
} from "./ponto-turistico-usecases.factory";

import { CreatePontoTuristicoController } from "../controllers/create-ponto-turistico.controller";
import { DeletePontoTuristicoController } from "../controllers/delete-ponto-turistico.controller";
import { GetPontoTuristicoByIdController } from "../controllers/get-ponto-turistico-by-id.controller";
import { ListPontosTuristicosController } from "../controllers/list-pontos-turisticos.controller";
import { UpdatePontoTuristicoController } from "../controllers/update-ponto-turistico.controller";

export function makeCreatePontoTuristicoController(): Controller {
  return new CreatePontoTuristicoController(makeCreatePontoTuristicoUseCase());
}

export function makeListPontosTuristicosController(): Controller {
  return new ListPontosTuristicosController(makeListPontosTuristicosUseCase());
}

export function makeGetPontoTuristicoByIdController(): Controller {
  return new GetPontoTuristicoByIdController(
    makeGetPontoTuristicoByIdUseCase(),
  );
}

export function makeUpdatePontoTuristicoController(): Controller {
  return new UpdatePontoTuristicoController(makeUpdatePontoTuristicoUseCase());
}

export function makeDeletePontoTuristicoController(): Controller {
  return new DeletePontoTuristicoController(makeDeletePontoTuristicoUseCase());
}
