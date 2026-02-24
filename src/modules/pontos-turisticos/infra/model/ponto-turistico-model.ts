import sequelize from "@/core/database";
import CidadeModel from "@/modules/cidades/infra/models/cidade-model";
import { DataTypes, Model } from "sequelize";

export class PontoTuristicoModel extends Model {
  id!: string;
  nome!: string;
  tipo!: string;
  horario!: string;
  img!: string;
  desc!: string;
  cidadeId!: number;
  cidade!: CidadeModel;
}

PontoTuristicoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
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
    modelName: "pontos-turisticos",
  },
);

PontoTuristicoModel.hasOne(CidadeModel, { foreignKey: "cidadeId", as: "cidades" });
PontoTuristicoModel.belongsTo(CidadeModel, { foreignKey: "cidadeId", as: "cidade" });

export default PontoTuristicoModel;
