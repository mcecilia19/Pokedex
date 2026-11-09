import PokemonCard from './PokemonCard'

function PokemonList({ pokemons, onSelecionar }) {
  return (
    <ul className="lista-pokemons">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelecionar={onSelecionar}
        />
      ))}
    </ul>
  )
}

export default PokemonList