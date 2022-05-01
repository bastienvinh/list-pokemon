import { PokemonInfo } from "../dto/PokemonInfo.dto"
import { PokemonListItem } from "../dto/PokemonListItem.dto"
import { PokemonType } from "../dto/PokemonType.dto"

class PokemonService {
  private constructor() {}

  public static getAll(limit: number = 151): Promise<Array<PokemonListItem>> {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(data => data.results.map(({ name }: any, index: number) => ({ name, id: index + 1 })))
      .catch(() => [])
  }

  public static getInfo(id: number): Promise<PokemonInfo> {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
  }

  public static getType(id: number): Promise<PokemonType> {
    return fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then(response => response.json())
  }

  // ⚠️ Be careful about the index
}

export default PokemonService
