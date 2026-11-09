import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'
import PokemonDetalhes from './components/PokemonDetalhes'
import PokemonFiltros from './components/PokemonFiltros'
import PokemonLista from './components/PokemonLista'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [proximaPagina, setProximaPagina] = useState(null)
  const [paginaAnterior, setPaginaAnterior] = useState(null)
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null)
  const [busca, setBusca] = useState('')
  const [tipos, setTipos] = useState([])
  const [tipoSelecionado, setTipoSelecionado] = useState('')
  const [nomesDoTipo, setNomesDoTipo] = useState([])
  const [quantidadePokemonTipo, setQuantidadePokemonTipo] = useState(0)
  const [carregandoTipo, setCarregandoTipo] = useState(false)

  const buscaNormalizada = busca.trim().toLowerCase()

  const pokemonsFiltrados = pokemons.filter(
  (pokemon) =>
    pokemon.name.includes(buscaNormalizada) &&
    (!tipoSelecionado || nomesDoTipo.includes(pokemon.name))
  )
  async function buscarPokemons(url) {
  setCarregando(true)
  setErro('')

  try {
    const resposta = await fetch(url)

    if (!resposta.ok) {
      throw new Error('Não foi possível buscar os Pokémon.')
    }

    const dados = await resposta.json()

    const detalhesDosPokemons = await Promise.all(
      dados.results.map(async (pokemon) => {
        const respostaDetalhe = await fetch(pokemon.url)

        if (!respostaDetalhe.ok) {
          throw new Error('Não foi possível buscar os detalhes.')
        }

        return respostaDetalhe.json()
      })
    )

    setPokemons(detalhesDosPokemons)
    setProximaPagina(dados.next)
    setPaginaAnterior(dados.previous)
  } catch {
    setErro('Não foi possível carregar a lista. Tente novamente.')
  } finally {
    setCarregando(false)
  }
}
  async function filtrarPorTipo(nomeTipo) {
  setTipoSelecionado(nomeTipo)
  setErro('')

  if (!nomeTipo) {
    setNomesDoTipo([])
    setQuantidadePokemonTipo(0)
    return
  }

  setCarregandoTipo(true)

  try {
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/type/${nomeTipo}`
    )

    if (!resposta.ok) {
      throw new Error('Não foi possível buscar esse tipo.')
    }

    const dados = await resposta.json()

    setNomesDoTipo(
      dados.pokemon.map((item) => item.pokemon.name)
    )
    setQuantidadePokemonTipo(dados.pokemon.length)
  } catch {
    setErro('Não foi possível carregar os Pokémon desse tipo.')
  } finally {
    setCarregandoTipo(false)
  }
}

  useEffect(() => {
    buscarPokemons('https://pokeapi.co/api/v2/pokemon?limit=20')
  }, [])

  useEffect(() => {
  async function buscarTipos() {
    try {
      const resposta = await fetch('https://pokeapi.co/api/v2/type')

      if (!resposta.ok) {
        throw new Error('Não foi possível buscar os tipos.')
      }

      const dados = await resposta.json()
      setTipos(dados.results)
    } catch {
      setErro('Não foi possível carregar os tipos.')
    }
  }

  buscarTipos()
}, [])

  return (
    <main>
      <h1>Pokédex</h1>

      <PokemonFiltros
        busca={busca}
        onBuscaChange={setBusca}
        tipos={tipos}
        tipoSelecionado={tipoSelecionado}
        onTipoChange={filtrarPorTipo}
        carregandoTipo={carregandoTipo}
        quantidadePokemonTipo={quantidadePokemonTipo}
      />
      {carregando && <p>Carregando Pokémon...</p>}
      {erro && <p>{erro}</p>}
            {pokemonSelecionado && (
        <PokemonDetalhes pokemon={pokemonSelecionado} />
      )}

      <PokemonLista
  pokemons={pokemonsFiltrados}
  onSelecionar={setPokemonSelecionado}
/>
      {!carregando && !erro && pokemonsFiltrados.length === 0 && (
        <p>Nenhum Pokémon encontrado nesta página.</p>
        )}

      <button
        onClick={() => buscarPokemons(paginaAnterior)}
        disabled={!paginaAnterior || carregando}
      >
        Anterior
      </button>

      <button
        onClick={() => buscarPokemons(proximaPagina)}
        disabled={!proximaPagina || carregando}
      >
        Próxima
      </button>
    </main>
  )
}

export default App