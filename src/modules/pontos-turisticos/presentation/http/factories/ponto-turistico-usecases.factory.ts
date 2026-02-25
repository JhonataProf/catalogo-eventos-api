import { CreatePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/create-ponto-turistico.usecase";
import { DeletePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/delete-ponto-turistico.usecase";
import { GetPontoTuristicoByIdUseCase } from "@/modules/pontos-turisticos/application/use-cases/get-ponto-turistico-by-id.usecase";
import { ListPontosTuristicosUseCase } from "@/modules/pontos-turisticos/application/use-cases/list-pontos-turisticos.usecase";
import { UpdatePontoTuristicoUseCase } from "@/modules/pontos-turisticos/application/use-cases/update-ponto-turistico.usecase";
import { SequelizePontoTuristicoRepository } from "@/modules/pontos-turisticos/infra/sequelize/sequelize-ponto-turistico.repository";

export function makeCreatePontoTuristicoUseCase() {
  const repo = new SequelizePontoTuristicoRepository();
  return new CreatePontoTuristicoUseCase(repo);
}

export function makeListPontosTuristicosUseCase() {
  const repo = new SequelizePontoTuristicoRepository();
  return new ListPontosTuristicosUseCase(repo);
}

export function makeGetPontoTuristicoByIdUseCase() {
  const repo = new SequelizePontoTuristicoRepository();
  return new GetPontoTuristicoByIdUseCase(repo);
}

export function makeUpdatePontoTuristicoUseCase() {
  const repo = new SequelizePontoTuristicoRepository();
  return new UpdatePontoTuristicoUseCase(repo);
}

export function makeDeletePontoTuristicoUseCase() {
  const repo = new SequelizePontoTuristicoRepository();
  return new DeletePontoTuristicoUseCase(repo);
}
