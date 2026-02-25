import { makePontoTuristicoRepository } from "./ponto-turistico-deps.factory";

import { CreatePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/create-ponto-turistico.usecase";
import { ListPontosTuristicosUseCase } from "@/modules/pontos-turisticos/application/use-cases/list-pontos-turisticos.usecase";
import { GetPontoTuristicoByIdUseCase } from "@/modules/pontos-turisticos/application/use-cases/get-ponto-turistico-by-id.usecase";
import { UpdatePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/update-ponto-turistico.usecase";
import { DeletePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/delete-ponto-turistico.usecase";

export function makeCreatePontoTuristicoUseCase() {
  const repo = makePontoTuristicoRepository();
  return new CreatePontoTuristicoUseCase(repo);
}

export function makeListPontosTuristicosUseCase() {
  const repo = makePontoTuristicoRepository();
  return new ListPontosTuristicosUseCase(repo);
}

export function makeGetPontoTuristicoByIdUseCase() {
  const repo = makePontoTuristicoRepository();
  return new GetPontoTuristicoByIdUseCase(repo);
}

export function makeUpdatePontoTuristicoUseCase() {
  const repo = makePontoTuristicoRepository();
  return new UpdatePontoTuristicoUseCase(repo);
}

export function makeDeletePontoTuristicoUseCase() {
  const repo = makePontoTuristicoRepository();
  return new DeletePontoTuristicoUseCase(repo);
}