// src/modules/events/infra/model/event-model.ts
import sequelize from "@/core/database";
import { CidadeModel } from "@/modules/cidades/infra/models/cidade-model";
import { DataTypes, Model } from "sequelize";

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
    cidadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cidades", // Name of the target model
        key: "id", // Key in the target model that we're referencing
      },
    },
  },
  {
    sequelize,
    tableName: "eventos",
  },
);

EventModel.belongsTo(CidadeModel, { foreignKey: "cidadeId", as: "cidade" });

export default EventModel;
