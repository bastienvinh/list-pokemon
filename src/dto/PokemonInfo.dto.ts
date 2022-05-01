interface PokemonInfoType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonInfo {
  id: number
  height: number
  weight: number

  // Important Infos
  sprites: {
    front_default: string
  }

  types: Array<PokemonInfoType>
}