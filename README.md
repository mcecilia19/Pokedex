# Pokédex

Aplicação front-end feita com React para consultar Pokémon usando a PokéAPI.

## Tecnologias

- React e React DOM
- Vite
- CSS
- Fetch para consultar a API

## Como executar

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço mostrado no terminal.

## Funcionalidades

- Exibe 20 Pokémon por página, com botões para avançar e voltar.
- Mostra nome, número, imagem e tipos.
- Abre os detalhes do Pokémon selecionado, incluindo altura, peso, habilidades, estatísticas e sprites.
- Busca Pokémon pelo nome na página atual.
- Filtra os Pokémon da página atual por tipo e informa quantos Pokémon existem naquele tipo.
- Mostra mensagens de carregamento e de erro.
- Usa CSS Grid para adaptar os cards a diferentes tamanhos de tela.

## Organização do código

- `src/App.jsx`: guarda os estados, consulta a API e organiza a página.
- `src/components/PokemonLista.jsx`: exibe a lista de Pokémon.
- `src/components/PokemonCard.jsx`: exibe um card e permite selecionar um Pokémon.
- `src/components/PokemonDetalhes.jsx`: exibe os detalhes do Pokémon selecionado.
- `src/components/PokemonFiltros.jsx`: exibe a busca por nome e o filtro por tipo.

## Decisões de implementação

A aplicação usa `useState` para guardar a lista, a busca, o tipo selecionado e o Pokémon escolhido. Usa `useEffect` para buscar os primeiros Pokémon e os tipos quando a página é aberta.

A lista da PokéAPI retorna nomes e URLs. Por isso, a aplicação faz requisições adicionais para buscar os detalhes de cada Pokémon. `Promise.all` espera essas requisições terminarem antes de atualizar a lista.

A paginação usa as URLs `next` e `previous` retornadas pela API. A busca e o filtro por tipo atuam sobre os Pokémon da página atual.