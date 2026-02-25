import { PontoTuristicoEntity } from "../../domain/entities/ponto-turistico.entity";
import { SequelizePontoTuristicoRepository } from "../../infra/sequelize/sequelize-ponto-turistico.repository";
import { createPontoTuristicoDTO } from "../dto";

export class CreatePontoTuristicoUseCase {
  constructor(private readonly repository: SequelizePontoTuristicoRepository) {}

  async execute(
    pontoTursiticoDTO: createPontoTuristicoDTO,
  ): Promise<createPontoTuristicoDTO> {
    const input: PontoTuristicoEntity = new PontoTuristicoEntity({
      nome: pontoTursiticoDTO.nome,
      tipo: pontoTursiticoDTO.tipo,
      horario: pontoTursiticoDTO.horario,
      img: pontoTursiticoDTO.img,
      desc: pontoTursiticoDTO.desc,
      cidadeId: pontoTursiticoDTO.cidadeId,
    });
    const ponto = await this.repository.create(input);
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
