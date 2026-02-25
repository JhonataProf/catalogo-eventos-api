import { AppError } from "@/core/errors-app-error";
import { SequelizePontoTuristicoRepository } from "../../infra/sequelize/sequelize-ponto-turistico.repository";
import { updatePontoTuristicoDTO } from "../dto";

export class UpdatePontoTuristicoUseCase {
  constructor(private readonly repository: SequelizePontoTuristicoRepository) {}

  async execute(
    id: number,
    input: updatePontoTuristicoDTO,
  ): Promise<updatePontoTuristicoDTO> {
    const ponto = await this.repository.update(id, input);
    if (!ponto) {
      throw new AppError({
        code: "PONTO_TURISTICO_NOT_FOUND",
        message: "Ponto turístico não encontrado",
        statusCode: 404,
      });
    }
    return {
      id: ponto.id,
      nome: ponto.nome,
      tipo: ponto.tipo,
      horario: ponto.horario,
      img: ponto.img,
      desc: ponto.desc,
      cidadeId: ponto.cidadeId,
    };
  }
}
