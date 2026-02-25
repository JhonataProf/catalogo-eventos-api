import { PontoTuristicoEntity } from "../../domain/entities/ponto-turistico.entity";
import { SequelizePontoTuristicoRepository } from "../../infra/sequelize/sequelize-ponto-turistico.repository";

export class GetPontoTuristicoByIdUseCase {
  constructor(private readonly repository: SequelizePontoTuristicoRepository) {}

  async execute(id: number): Promise<PontoTuristicoEntity | null> {
    return await this.repository.findById(id);
  }
}
