import sequelize from "@/core/database";
import PontoTuristicoModel from "@/modules/pontos-turisticos/infra/model/ponto-turistico-model";
import { DataTypes, Model } from "sequelize";

export class CidadeModel extends Model {
  id!: number;
  nome!: string;
  uf!: string;
  desc!: string;
  pontosTuristicos!: PontoTuristicoModel[];
}

CidadeModel.init(
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
    uf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pontosTuristicos: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("pontosTuristicos") || [];
      },
    },
  },
  {
    sequelize,
    modelName: "cidades",
  }
);

export default CidadeModel;