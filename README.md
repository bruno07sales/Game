# Reciclando — Versão Alpha (Marco 3)

Jogo educativo de coleta seletiva desenvolvido em HTML, CSS e JavaScript, sem engine e sem bibliotecas externas.

**Equipe:** Bruno Araújo Sales, Gabriel Martins da Silva e Pablo Miranda dos Santos.

**Versão atual:** Alpha, com três fases jogáveis, preparada para a apresentação de 25/11/2026.

## Executar

Abra o arquivo `index.html` no navegador de computador. Não é necessário instalar dependências nem ter conexão com a internet.

Opcionalmente, execute `python -m http.server 8000 --bind 127.0.0.1` na pasta do projeto e abra `http://127.0.0.1:8000`.

## Funcionamento

O jogador deve classificar corretamente os resíduos que aparecem em uma esteira, identificando o material e seu estado para escolher a lixeira adequada.

- O jogador clica diretamente na lixeira desejada. Não é necessário selecionar ou arrastar os resíduos.
- O item descartado é o que está mais próximo do fim da esteira, identificado por uma seta.
- Acertos concedem 100 pontos. Erros retiram 50 pontos, sem permitir pontuação negativa.
- Cada erro aumenta a contaminação em 20%. Ao atingir 100%, a fase termina em derrota.
- Itens que chegam ao final da esteira sem serem descartados também contam como erros.
- A esteira fica progressivamente mais rápida nas fases seguintes.
- Ao vencer uma fase, são apresentados três cards educativos, priorizando os resíduos classificados incorretamente.
- As fases são desbloqueadas sequencialmente após cada vitória.
- É possível pausar, reiniciar ou sair da fase durante a partida.
- O progresso fica apenas na memória. Ao atualizar ou fechar a página, as fases voltam a ficar bloqueadas, exceto Casa.

Os controles utilizam mouse, com suporte à navegação por teclado (Tab e Enter/Espaço nos botões). A tecla Esc permite pausar e retomar a partida.

## Fases disponíveis na versão Alpha

| Fase | Itens por partida | Tipos de resíduos | Lixeiras | Travessia | Intervalo máximo |
|---|---:|---:|---:|---:|---:|
| 1. Casa | 15 | 8 | 4 | 12 s | 6 s |
| 2. Escola | 20 | 11 | 5 | 10 s | 5 s |
| 3. Cooperativa de Reciclagem | 25 | 14 | 6 | 8 s | 4 s |

**Casa:** apresenta a separação entre papel, plástico, orgânicos e rejeitos, destacando a diferença entre materiais limpos e contaminados.

**Escola:** introduz metal, vidro e resíduos quebrados, aumentando a variedade de materiais e a dificuldade.

**Cooperativa de Reciclagem:** introduz papel molhado, embalagens com líquido e pilhas, que exigem destinação específica.

As três fases totalizam 60 ocorrências de resíduos em uma jornada completa, considerando uma tentativa por fase.

O primeiro item entra aproximadamente um segundo após o início. Os intervalos da tabela representam o tempo máximo previsto entre entradas, podendo ser reduzidos quando a esteira fica vazia.

Após vencer a terceira fase, o jogador pode consultar os resultados e retornar à seleção de fases. A tela final da jornada completa será integrada posteriormente.

## Estrutura do projeto

```
Reciclando/
├── index.html                 # Entrada principal do jogo
├── README.md                  # Documentação do projeto
├── CREDITOS-DOS-ASSETS.md    # Créditos dos recursos
│
├── dados/                     # Configurações e conteúdo
│   ├── config.js
│   ├── itens.js
│   ├── lixeiras.js
│   └── fases/
│       ├── fase1-casa.js
│       ├── fase2-escola.js
│       └── fase3-cooperativa.js
│
├── js/                        # Lógica e funcionamento
│   ├── base.js
│   ├── principal.js
│   ├── regras/
│   │   ├── sorteio.js
│   │   ├── partida.js
│   │   ├── pontuacao.js
│   │   ├── contaminacao.js
│   │   ├── progresso.js
│   │   └── validar-dados.js
│   ├── jogo/
│   │   ├── tela-jogo.js
│   │   ├── esteira.js
│   │   ├── lixeiras.js
│   │   ├── controles.js
│   │   ├── placar.js
│   │   └── retorno.js
│   └── telas/
│       ├── inicial.js
│       ├── como-jogar.js
│       ├── fases.js
│       ├── abertura.js
│       ├── cards.js
│       └── resultado.js
│
├── css/                       # Aparência do jogo
│   ├── base.css
│   ├── jogo.css
│   ├── telas.css
│   └── cards.css
│
├── imagens/                   # Recursos visuais
│   ├── cenarios/
│   ├── itens/
│   ├── lixeiras/
│   └── icone.svg
│
└── testes/                    # Testes automatizados em Node.js
```

O arquivo `index.html` é o ponto de entrada do jogo e carrega os módulos na ordem necessária.

**Dados e configurações:**

- `dados/config.js`: pontuação, contaminação, tempos gerais e configurações.
- `dados/itens.js`: catálogo de resíduos e suas características.
- `dados/lixeiras.js`: catálogo das lixeiras e pontos de coleta.
- `dados/fases/fase1-casa.js`: configuração da fase Casa.
- `dados/fases/fase2-escola.js`: configuração da fase Escola.
- `dados/fases/fase3-cooperativa.js`: configuração da fase Cooperativa.

**Lógica e funcionamento:**

- `js/base.js`: estrutura compartilhada e sistema de eventos.
- `js/regras/`: sorteio, controle da partida, pontuação, contaminação, progressão e validação dos dados.
- `js/jogo/`: esteira, lixeiras, controles, placar, feedback e interface da partida.
- `js/telas/`: telas inicial, seleção de fases, abertura, instruções, cards educativos e resultados.
- `js/principal.js`: controla o fluxo entre as telas e deve ser carregado por último.

**Interface e recursos:**

- `css/`: estilos gerais, jogo, demais telas e cards.
- `imagens/`: desenhos dos resíduos, lixeiras, cenários e ícone.
- `fontes/`: Londrina Solid e Lexend, incluídas com suas licenças para uso offline.
- `CREDITOS-DOS-ASSETS.md`: Créditos dos recursos utilizados.

A interface acompanha a referência https://reciclando.vercel.app/, com fontes locais, ícones SVG, painéis de abertura, seleção de fases e estilos responsivos em `css/responsivo.css`. Esta versão mantém as três fases Alpha e inclui créditos acessíveis pelo menu.


## Testes automatizados

Com Node.js instalado, execute na raiz do projeto:

```sh
node testes/regras.cjs
node testes/interface.cjs
```

Os testes verificam o motor da esteira e a integração dos scripts com um DOM mínimo, incluindo recursos locais, as três fases, pontuação, derrota, pausa, cards e desbloqueio. A aparência deve ser conferida no navegador.

## Testes e demonstração do Marco 3

Para demonstrar o funcionamento da versão Alpha, devem ser verificados:

- Execução do jogo e navegação pelas telas.
- Descarte correto e incorreto, incluindo a queda de resíduos da esteira.
- Pontuação, contaminação e condições de vitória e derrota.
- Cards educativos e desbloqueio sequencial das três fases.
- Reinício, pausa e progressão entre fases.

Na tela de seleção de fases, cinco cliques seguidos no título ativam o modo de teste e liberam as fases disponíveis, facilitando a demonstração.

O Trello acompanha as tarefas, validações e eventuais problemas encontrados durante o desenvolvimento.

## Próxima etapa — versão final

Após a apresentação Alpha de 25/11, o cronograma prevê a integração dos recursos restantes:

- Quarta fase: Centro de Resíduos Especiais, com 30 itens e 12 lixeiras.
- Efeitos sonoros e controle de som.
- Tela final da jornada.
- Testes e validação da versão completa.

A entrega final está prevista para **02/12/2026**, com as quatro fases integradas.
