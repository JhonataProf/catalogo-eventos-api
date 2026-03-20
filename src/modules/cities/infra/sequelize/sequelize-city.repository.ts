import { Transaction } from "sequelize";
import { CityEntity } from "../../domain/entities/city.entity";
import {
  CreateCityRepository,
  DeleteCityRepository,
  EditCityRepository,
  FindCityByIdRepository,
  FindCityByNameRepository,
  ListCityRepository,
} from "../../domain/repositories";
import { CityModel } from "../models/city-model";

export class SequelizeCityRepository
  implements
    CreateCityRepository,
    ListCityRepository,
    FindCityByIdRepository,
    EditCityRepository,
    DeleteCityRepository,
    FindCityByNameRepository
{
  constructor() {}
  async findByName(name: string): Promise<CityEntity | null> {
    const city = await CityModel.findOne({ where: { name } });
    if (!city) return null;
    return new CityEntity({
      id: city.id,
      name: city.name,
      slug: city.slug,
      state: city.state,
      summary: city.summary,
      description: city.description,
      imageUrl: city.imageUrl,
      published: city.published,
    });
  }

  async create(city: CityEntity, t?: Transaction): Promise<CityEntity> {
    const created = await CityModel.create(
      {
        name: city.name,
        slug: city.slug,
        state: city.state,
        summary: city.summary,
        description: city.description,
        imageUrl: city.imageUrl,
        published: city.published,
      },
      { transaction: t },
    );
    await CityModel.sync();
    return new CityEntity({
      id: created.id,
      name: created.name,
      slug: created.slug,
      state: created.state,
      summary: created.summary,
      description: created.description,
      imageUrl: created.imageUrl,
      published: created.published,
    });
  }

  async list(): Promise<CityEntity[]> {
    const cities = await CityModel.findAll();
    return cities.map(
      (city) =>
        new CityEntity({
          id: city.id,
          name: city.name,
          slug: city.slug,
          state: city.state,
          summary: city.summary,
          description: city.description,
          imageUrl: city.imageUrl,
          published: city.published,
        }),
    );
  }

  async findById(id: number): Promise<CityEntity | null> {
    const city = await CityModel.findByPk(id);
    if (!city) return null;

    return new CityEntity({
      id: city.id,
      name: city.name,
      slug: city.slug,
      state: city.state,
      summary: city.summary,
      description: city.description,
      imageUrl: city.imageUrl,
      published: city.published,
    });
  }

  async edit(
    id: number,
    city: Partial<CityEntity>,
    t?: Transaction,
  ): Promise<CityEntity | null> {
    
    const cityUpdated = await CityModel.update(city, {
      where: { id },
      transaction: t,
    });
    await CityModel.sync();
    if (cityUpdated[0] === 0) return null;
    return this.findById(id);
  }

  async delete(id: number, t?: Transaction): Promise<boolean> {
    const deleted = await CityModel.destroy({
      where: { id },
      transaction: t,
    });
    await CityModel.sync();
    return deleted > 0;
  }
}
