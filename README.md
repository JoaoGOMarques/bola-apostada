# Bet Builder Pro

Atue como um desenvolvedor Front-end experiente. Crie o código para um esboço de uma Landing Page simples focada em palpites/apostas esportivas. A página deve ter um design limpo, moderno e responsivo (recomendo usar Tailwind CSS).

Funcionalidades e Layout necessários:

Cabeçalho: Um título simples como "Palpites Brasileirão Série A".

Componente de Caixa de Jogo (Match Card):

Cada caixa representa uma partida.

Dentro da caixa, devem existir dois menus suspensos (dropdowns/selects) lado a lado, separados por um "X" ou "VS".

Os dropdowns devem ser preenchidos com os 20 times atuais do Campeonato Brasileiro Série A (ex: Flamengo, Palmeiras, São Paulo, Atlético-MG, etc.).

Um dropdown será o time Mandante (Casa) e o outro o time Visitante (Fora).

Logo abaixo da seleção dos times, deve haver um grupo de botões (ou radio buttons estilizados como botões clicáveis) com 3 opções de palpite: "Casa", "Empate" e "Fora". O usuário só pode selecionar uma dessas 3 opções por caixa.

Adição Dinâmica de Caixas:

Abaixo das caixas de jogos, deve existir um botão em destaque chamado "+ Adicionar novo jogo".

Quando o usuário clicar neste botão, uma nova "Caixa de Jogo" (idêntica à descrita acima, com os times em branco) deve ser renderizada na tela, permitindo que o usuário adicione quantos jogos quiser na mesma página.

Comportamento (Lógica simples):

Faça o gerenciamento de estado (pode ser com React, Vanilla JS ou Alpine.js) para permitir a renderização de múltiplas caixas.

As caixas devem ficar empilhadas verticalmente.

Inclua um botão pequeno de "Remover" (ícone de lixeira ou um "X") no canto de cada caixa, caso o usuário queira excluir um jogo adicionado por engano.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69b832ba-035a-46f5-88b3-235b177c72c4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
