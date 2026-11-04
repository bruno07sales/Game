# Reciclando — fase Casa

Jogo educativo em HTML, CSS e JavaScript, sem dependências. Projeto Aplicado VII — Jogos Digitais (UnDF, 2026.2).

Equipe: Bruno Araújo Sales,  Gabriel Martins da Silva e  Pablo Miranda dos Santos.

## Executar

Abra `index.html` no navegador. Funciona sem instalação e sem internet.
Opcionalmente execute `python -m http.server 8000 --bind 127.0.0.1` e abra `http://127.0.0.1:8000`.

## Funcionamento

- Casa tem 15 itens, oito tipos de resíduos e quatro lixeiras.
- O primeiro item entra após 1 segundo; os demais a cada 6 segundos. Cada item leva 12 segundos para atravessar.
- Clique/toque em uma lixeira ou use Tab e Enter/Espaço nos botões. O descarte retira o item destacado, mais perto do fim.
- Há feedback de acerto, erro e queda, indicando o destino correto.
- Reiniciar limpa a esteira e começa outra rodada. A simulação pausa quando a aba fica oculta e retoma sem acumular o tempo ausente.
- Após os 15 itens, a rodada termina e aguarda reinício.

## Estrutura
```
Game/
├── index.html      Abre o jogo e lista, em ordem, todos os arquivos usados
├── dados/          O QUE o jogo tem: números, lixeiras, itens, fases, sons
|   ├──config.js        Configuração original; nesta etapa usa-se apenas `esteira.esperaInicial`.
|   ├──itens.js         catálogos completos, incluindo dados futuros.
|   ├──lixeiras.js      catálogos completos, incluindo dados futuros.
|   ├──fases
|       ├──fase1-casa.js      seleção dos oito itens, quatro lixeiras, quantidade e tempos da Casa.
├── js/             COMO o jogo funciona
│   ├── base.js         namespace compartilhado; carregado primeiro.
│   ├── regras/         o jogo sem a parte visual
│   ├── jogo/           a tela de jogo
│   ├── telas/          as outras telas
│   ├── extras/         sons
│   └── principal.js    seleciona Casa e conecta seus dados à interface; carregado por último.
|   ├── regras
|       ├──sorteio.js        fila embaralhada; apresenta todos os tipos antes de repetir.
|       ├──partida.js        entrada, movimento, descarte, queda e reinício, sem HTML.
|       ├──tela-jogo.js      esteira, controles, feedback e pausa por visibilidade.
├── css/            aparência
│   ├──jogo.css     aparência, imagens e créditos preservados.
├── imagens/        desenhos dos itens, das lixeiras e dos cenários
├── sons/           efeitos sonoros
└── fontes/         fontes e licenças
├──testes
|   ├── regras      testes das regras e dos caminhos usados na Casa.
├──CREDITOS-DOS-ASSETS.md
```