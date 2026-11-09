function PokemonCard({ pokemon, onSelecionar }) {
  return (
    <li className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="100"
      />

      <h2>
        #{pokemon.id} {pokemon.name}
      </h2>

      <p>
        Tipos: {pokemon.types.map((tipo) => tipo.type.name).join(', ')}
      </p>

      <button onClick={() => onSelecionar(pokemon)}>
        Ver detalhes
      </button>
    </li>
  )
}

export default PokemonCard