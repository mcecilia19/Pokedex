function PokemonDetalhes({ pokemon }) {
  return (
    <section className="pokemon-detalhes">
      <h2>Detalhes de {pokemon.name}</h2>

      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>

      <p>
        Habilidades:{' '}
        {pokemon.abilities
          .map((item) => item.ability.name)
          .join(', ')}
      </p>

      <h3>Estatísticas</h3>
      <ul className="lista-estatisticas">
        {pokemon.stats.map((item) => (
          <li key={item.stat.name}>
            {item.stat.name}: {item.base_stat}
          </li>
        ))}
      </ul>

      <h3>Sprites</h3>

      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} de frente`}
          width="100"
        />
      )}

      {pokemon.sprites.back_default && (
        <img
          src={pokemon.sprites.back_default}
          alt={`${pokemon.name} de costas`}
          width="100"
        />
      )}
    </section>
  )
}

export default PokemonDetalhes