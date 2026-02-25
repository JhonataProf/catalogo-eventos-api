import { PontoTuristicoEntity } from "../../domain/entities/ponto-turistico.entity";
import { SequelizePontoTuristicoRepository } from "../../infra/sequelize/sequelize-ponto-turistico.repository";

export class FindPontoTuristicoByCidadeIdUseCase {
  constructor(private readonly repository: SequelizePontoTuristicoRepository) {}

  async execute(cidadeId: number): Promise<PontoTuristicoEntity[]|null> {
    return await this.repository.findByCidadeId(cidadeId);
  }
}