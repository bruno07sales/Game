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

- `js/base.js`: namespace compartilhado; carregado primeiro.
- `dados/config.js`: configuração original; nesta etapa usa-se apenas `esteira.esperaInicial`.
- `dados/itens.js` e `dados/lixeiras.js`: catálogos completos, incluindo dados futuros.
- `dados/fases/fase1-casa.js`: seleção dos oito itens, quatro lixeiras, quantidade e tempos da Casa.
- `js/regras/sorteio.js`: fila embaralhada; apresenta todos os tipos antes de repetir.
- `js/regras/partida.js`: entrada, movimento, descarte, queda e reinício, sem HTML.
- `js/jogo/tela-jogo.js`: esteira, controles, feedback e pausa por visibilidade.
- `js/principal.js`: seleciona Casa e conecta seus dados à interface; carregado por último.
- `css/jogo.css`, `imagens/` e `CREDITOS-DOS-ASSETS.md`: aparência, imagens e créditos preservados.
- `testes/regras.cjs`: testes das regras e dos caminhos usados na Casa.


## Validação

Execute `node testes/regras.cjs` para verificar catálogos, imagens da Casa, entrada, intervalo, travessia, descarte correto/incorreto, queda, reinício e conclusão dos 15 itens.
Execute também `node testes/interface.cjs` para conferir a ordem real dos scripts, caminhos HTML, criação das quatro lixeiras, clique, feedback, reinício, pausa e retomada com um DOM simulado. Ambos passaram; esse teste não substitui a conferência visual ou o teclado nativo do navegador.
A conferência visual no Edge foi tentada, mas a ferramenta encerrou o controle por não conseguir identificar a URL atual com confiança. A validação visual e a interação real por teclado no navegador ficam pendentes.

Nenhum push ou publicação foi realizado. O workflow de GitHub Pages existente foi preservado.
