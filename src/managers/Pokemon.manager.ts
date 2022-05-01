import { PokemonInfo } from "../dto/PokemonInfo.dto";
import { PokemonListItem } from "../dto/PokemonListItem.dto";
import { PokemonType } from "../dto/PokemonType.dto";
import PokemonModel from "../models/Pokemon.model";
import PokemonService from "../services/Pokemon.services";

interface PokemonCharacteristic {
  info: PokemonInfo,
  types: Array<PokemonType>
}

class PokemonManager {
  private constructor() {}

  private static convertToModel(dto: PokemonListItem, extra: PokemonCharacteristic) {
    const model = Object.assign(new PokemonModel(), dto)

    model.defaultImageUrl = extra.info.sprites.front_default
    model.types = extra.types.map(type => ({ id: type.id, name: type.name }))

    return model
  }

  public static async getAll(limit: number = 151): Promise<Array<PokemonModel>> {
    const monsters = await PokemonService.getAll(limit)
    const ids = monsters.map(monster => monster.id)

    const carateristics = await PokemonManager.getAllCharacteristics(ids)

    return monsters.map((monster, index) => PokemonManager.convertToModel(monster, carateristics[index]))
  }

  private static async getAllCharacteristics(ids: Array<number>): Promise<Array<PokemonCharacteristic>> {
    // ⚠️ Be careful with the promise.all
    const infos = await Promise.all(ids.map(PokemonService.getInfo))
    const urls = Array.from(new Set(infos.flatMap(info => info.types.map(type => type.type.url))))
    
    const typesIds = urls
      .map(url => url.split("/"))
      .map(tab => tab[tab.length - 2])
      .map(str => +str)

    const allTypes = await Promise.all(typesIds.map(PokemonService.getType))

    return infos.map(info => {
      const types = info.types.map(type => allTypes.find(at => at.name === type.type.name)!)
      return { info, types }
    })
  }
}

export default PokemonManager