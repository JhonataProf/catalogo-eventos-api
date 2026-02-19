import { Transaction } from "sequelize";
import { PontoTuristicoEntity } from "../../domain/entities/ponto-turistico.entity";
import {
  CreatePontoTuristicoRepository,
  DeletePontoTuristicoRepository,
  FindPontoTuristicoByCidadeRepository,
  FindPontoTuristicoByIdRepository,
  ListPontoTuristicoRespository,
  UpdatePontoTuristicoRepository,
} from "../../domain/repositories";
import PontoTuristicoModel from "../model/ponto-turistico-model";

export class SequelizePontoTuristicoRepository
  implements
    CreatePontoTuristicoRepository,
    DeletePontoTuristicoRepository,
    FindPontoTuristicoByCidadeRepository,
    FindPontoTuristicoByIdRepository,
    ListPontoTuristicoRespository,
    UpdatePontoTuristicoRepository
{
  constructor() {}
    async create(data: PontoTuristicoEntity, t?: Transaction): Promise<PontoTuristicoEntity> {
        const created = await PontoTuristicoModel.create(
              {
                id: 0, // Substitua pelo ID gerado pelo banco de dados
                nome: data.nome,
                tipo: data.tipo,
                horario: data.horario,
                img: data.img,
                desc: data.desc
              },
              { transaction: t },
            );
            await PontoTuristicoModel.sync();
            return new PontoTuristicoEntity({
              id: created.id,
              nome: created.nome,
              tipo: created.tipo,
              horario: created.horario,
              img: created.img,
              desc: created.desc
            });
    }
    async delete(id: number, t?: Transaction): Promise<boolean> {
        const deleted = await PontoTuristicoModel.destroy({
              where: { id },
              transaction: t,
            });
            await PontoTuristicoModel.sync();
            return deleted > 0;
    }
    async findByCidadeId(cidadeId: number, t?: Transaction): Promise<PontoTuristicoEntity[]|null> {
        const pontos = await PontoTuristicoModel.findAll({where: {cidadeId: cidadeId}});

        const pontoTuristicos = pontos.map((p) => new PontoTuristicoEntity({
              id: p.id,
              nome: p.nome,
              tipo: p.tipo,
              horario: p.horario,
              img: p.img,
              desc: p.desc
            }));
            return pontoTuristicos
    }
    async findById(id: number, t?: Transaction): Promise<PontoTuristicoEntity|null> {
        const ponto = await PontoTuristicoModel.findByPk(id);
            if (!ponto) return null;
        
            return new PontoTuristicoEntity({
              id: ponto.id,
              nome: ponto.nome,
              tipo: ponto.tipo,
              horario: ponto.horario,
              img: ponto.img,
              desc: ponto.desc
            });
    }
    async list(): Promise<PontoTuristicoEntity[]|null> {
        const pontos = await PontoTuristicoModel.findAll();
            return pontos.map(
              (p) =>
                new PontoTuristicoEntity({
                  id: p.id,
              nome: p.nome,
              tipo: p.tipo,
              horario: p.horario,
              img: p.img,
              desc: p.desc
                }),
            );
    }
    async update(id:number, data: Partial<PontoTuristicoEntity>, t?: Transaction): Promise<PontoTuristicoEntity|null> {
        const pontoUpdated = await PontoTuristicoModel.update(data, {
              where: { id },
              transaction: t,
            });
            await PontoTuristicoModel.sync();
            if (pontoUpdated[0] === 0) return null;
            return this.findById(id);
    }
}
