export class PokemonModelType {
  constructor(
    public id: number = 0,
    public name: string = ""
  ) {

  }
}

export class PokemonModel {
  constructor(
    public id: number = -1,
    public name: string = "",
    public types: Array<PokemonModelType> = [],
    public defaultImageUrl: string = "",
    public caught: boolean = false
  ) {}
}

export default PokemonModel