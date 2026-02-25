import { SequelizePontoTuristicoRepository } from "../../infra/sequelize/sequelize-ponto-turistico.repository";

export class DeletePontoTuristicoUseCase {
  constructor(private readonly repository: SequelizePontoTuristicoRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}