import Logo from "../../components/Logo/Logo.component"
import SearchInput from "../../components/SearchInput/SearchInput.component"
import "./Home.styles.scss"

// import { Grid, _ } from "gridjs-react"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import PokemonModel, { PokemonModelType } from "../../models/Pokemon.model"
import PokemonManager from "../../managers/Pokemon.manager"
import ResultCard from "../../components/ResultCard/ResultCard.component"
import MathUtils from "../../utils/Math.utils"
import TableList from "../../components/TableList/TableList.component"


const Home = () => {
  const [pokemons, setPokemons] = useState<Array<PokemonModel>>([])
  const [searchPattern, setSearchPattern] = useState("")
  const [numberPokemonMax, setNumberPokemonMax] = useState(251)
  const [selectedPokemons, setSelectedPokemons] = useState<Array<number>>([])

  const [numberCaught, setNumberCaught] = useState(0)

  const formRef = useRef<HTMLFormElement>(null)
  
  useEffect(() => {
    PokemonManager.getAll(numberPokemonMax).then(setPokemons)
  }, [numberPokemonMax])

  useEffect(() => {
    setNumberCaught(selectedPokemons.length)
  }, [selectedPokemons])

  // const onChangeSelectedHandler = () => {
  //   // Take all at once
  //   const formData = new FormData(formRef.current!)
  //   const selected = Array.from(formData.values())
  //                           .map(value => parseInt(value.toString(), 10))

  //   setSelectedPokemons(selected)
  // }

  const filteredPokemons = useMemo(() => pokemons.filter(pokemon => 
    (searchPattern?.length && pokemon.name.includes(searchPattern)) 
    || !searchPattern.length), [pokemons, searchPattern])

  // #region Extras Infos
  const percentCaught = MathUtils.round(numberCaught / numberPokemonMax, 2)
  // #endregion

  return (
    <Fragment>
      <div className="toolbar-top bg-gray-800 flex items-center shadow">
        <Logo />
        <SearchInput onChangeValue={setSearchPattern} />
        <div className="p-5" ></div>
        <input
          type="number"
          value={numberPokemonMax}
          onChange={e => setNumberPokemonMax(e.target.valueAsNumber)}
          className="
            form-control
            block
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
        />
      </div>
      <div className="p-20 flex flex-row gap-12 items-start">
        <TableList data={filteredPokemons} />
        <ResultCard nb={numberCaught} max={numberPokemonMax} percent={percentCaught} />
      </div>
    </Fragment>
  )
}

export default Home