function PokemonFiltros({
  busca,
  onBuscaChange,
  tipos,
  tipoSelecionado,
  onTipoChange,
  carregandoTipo,
  quantidadePokemonTipo,
}) {
  return (
    <>
      <div className="busca">
        <label htmlFor="busca-pokemon">Buscar por nome</label>
        <input
          id="busca-pokemon"
          type="text"
          value={busca}
          onChange={(evento) => onBuscaChange(evento.target.value)}
          placeholder="Ex.: pikachu"
        />
      </div>

      <div className="filtro-tipo">
        <label htmlFor="filtro-tipo">Filtrar por tipo</label>
        <select
          id="filtro-tipo"
          value={tipoSelecionado}
          onChange={(evento) => onTipoChange(evento.target.value)}
        >
          <option value="">Todos os tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo.name} value={tipo.name}>
              {tipo.name}
            </option>
          ))}
        </select>
      </div>

      {carregandoTipo && <p>Carregando Pokémon desse tipo...</p>}

      {tipoSelecionado && !carregandoTipo && (
        <p>
          Existem {quantidadePokemonTipo} Pokémon do tipo {tipoSelecionado}.
          A lista mostra os correspondentes da página atual.
        </p>
      )}
    </>
  )
}

export default PokemonFiltros