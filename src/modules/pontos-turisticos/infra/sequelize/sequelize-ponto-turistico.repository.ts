import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../../domain/entities/ponto-turistico.entity";
import {
  CreatePontoTuristicoRepository,
  DeletePontoTuristicoRepository,
  FindPontoTuristicoByCidadeRepository,
  FindPontoTuristicoByIdRepository,
  UpdatePontoTuristicoRepository,
  ListPontosTuristicosRepository,
} from "../../domain/repositories";
import PontoTuristicoModel from "../model/ponto-turistico-model";
import { QuerySpecification } from "../../domain/specifications/query-specification";

export class SequelizePontoTuristicoRepository
  implements
    CreatePontoTuristicoRepository,
    DeletePontoTuristicoRepository,
    FindPontoTuristicoByCidadeRepository,
    FindPontoTuristicoByIdRepository,
    UpdatePontoTuristicoRepository,
    ListPontosTuristicosRepository
{
  constructor() {}

  listSpec(params: { spec?: QuerySpecification | null; limit: number; offset: number; order: [string, "ASC" | "DESC"][]; }): Promise<{ rows: any[]; count: number; }> {
    const where = params.spec?.toWhere?.() ?? {};

    return PontoTuristicoModel.findAndCountAll({
      where,
      limit: params.limit,
      offset: params.offset,
      order: params.order,
    });
  }

  async create(data: PontoTuristicoEntity, t?: Transaction): Promise<PontoTuristicoEntity> {
    const created = await PontoTuristicoModel.create(
      {
        nome: data.nome,
        tipo: data.tipo ?? null,
        horario: data.horario ?? null,
        img: data.img,
        desc: data.desc ?? null,
        cidadeId: data.cidadeId, // ✅ obrigatório pela model
      },
      { transaction: t }
    );

    return new PontoTuristicoEntity({
      id: created.id,
      nome: created.nome,
      tipo: created.tipo,
      horario: created.horario,
      img: created.img,
      desc: created.desc,
      cidadeId: created.cidadeId, // ✅
    });
  }

  async findById(id: number): Promise<PontoTuristicoEntity | null> {
    const ponto = await PontoTuristicoModel.findByPk(id);
    if (!ponto) return null;

    return new PontoTuristicoEntity({
      id: ponto.id,
      nome: ponto.nome,
      tipo: ponto.tipo,
      horario: ponto.horario,
      img: ponto.img,
      desc: ponto.desc,
      cidadeId: ponto.cidadeId, // ✅
    });
  }

  async findByCidadeId(cidadeId: number): Promise<PontoTuristicoEntity[] | null> {
    const pontos = await PontoTuristicoModel.findAll({ where: { cidadeId } });

    return pontos.map(
      (p) =>
        new PontoTuristicoEntity({
          id: p.id,
          nome: p.nome,
          tipo: p.tipo,
          horario: p.horario,
          img: p.img,
          desc: p.desc,
          cidadeId: p.cidadeId, // ✅
        })
    );
  }

  async update(
    id: number,
    data: Partial<PontoTuristicoEntity>,
    t?: Transaction
  ): Promise<PontoTuristicoEntity | null> {
    const [affected] = await PontoTuristicoModel.update(
      {
        nome: data.nome,
        tipo: data.tipo,
        horario: data.horario,
        img: data.img,
        desc: data.desc,
        cidadeId: data.cidadeId,
      },
      { where: { id }, transaction: t }
    );

    if (affected === 0) return null;
    return this.findById(id);
  }

  async delete(id: number, t?: Transaction): Promise<boolean> {
    const deleted = await PontoTuristicoModel.destroy({ where: { id }, transaction: t });
    return deleted > 0;
  }
}
