// src/modules/events/infra/model/event-model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "@/core/database";
import { CidadeModel } from "@/modules/cidades/infra/models/cidade-model";

class EventModel extends Model {
  id!: number;
  titulo!: string;
  cat!: string;
  data!: string;
  hora!: string;
  local!: string;
  preco!: string;
  img!: string;
  desc!: string;
  cidadeId!: number;
  static associate() {
    // CASCADE/RESTRICT depende da sua regra. Eu deixei RESTRICT para não apagar eventos ao apagar cidade.
    EventModel.belongsTo(CidadeModel, {
      foreignKey: "cidadeId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  }
}

EventModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    cat: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.STRING, allowNull: false },
    hora: { type: DataTypes.STRING, allowNull: false },
    local: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
    cidadeId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "Eventos",
  },
);

export default EventModel;
