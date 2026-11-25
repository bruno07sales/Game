# Reciclando — roteiro de apresentação e documentação aprofundada

Material elaborado a partir dos arquivos presentes no projeto em 25/11/2026. A primeira parte organiza uma apresentação de aproximadamente 15 minutos, incluindo demonstração. A segunda serve para estudo, consulta técnica e respostas às perguntas da banca.

**Equipe:** Bruno Araújo Sales, Gabriel Martins da Silva e Pablo Miranda dos Santos.  
**Disciplina:** Projeto Aplicado VII – Jogos Digitais.  
**Curso e instituição:** Engenharia de Software, 7º semestre, UnDF.  
**Professora:** Cíntia da Costa Souza.  
**Versão apresentada:** Alpha, com três fases jogáveis.

## Parte 1 — apresentação geral de 15 minutos

### Distribuição do tempo

| Tempo | Assunto | Apoio visual sugerido |
|---|---|---|
| 00:00–01:00 | Apresentação e problema | Menu inicial |
| 01:00–02:30 | Objetivo educativo e mecânica | Como jogar e exemplos de resíduos |
| 02:30–04:00 | Jornada e dificuldade | Seleção de fases |
| 04:00–06:00 | Organização das pastas | Explorador do editor |
| 06:00–08:00 | Tecnologias e arquitetura | `index.html` e `js/base.js` |
| 08:00–10:00 | Rotina interna de uma jogada | `partida.js`, eventos e placar |
| 10:00–13:00 | Demonstração prática | Jogo no navegador |
| 13:00–14:00 | Testes e qualidade | Terminal e recursos de acessibilidade |
| 14:00–15:00 | Estado atual e próximos passos | Resultado e encerramento |

Os tempos incluem a fala e a navegação. Os textos abaixo são uma base de fala; use as ações e os exemplos para ocupar cada intervalo sem precisar ler código linha por linha.

### 1. Apresentação e problema — 1 minuto

**Fala sugerida:**

> Nosso projeto se chama Reciclando. É um jogo educativo sobre triagem e descarte de resíduos, desenvolvido para funcionar diretamente no navegador. A proposta é transformar uma decisão do cotidiano em uma atividade interativa: identificar um resíduo, observar sua condição e escolher o destino adequado.
>
> Uma dificuldade que trabalhamos é que reconhecer o material nem sempre resolve a classificação. Uma caixa de pizza limpa e outra engordurada são parecidas, mas recebem destinos diferentes nas regras do jogo. A experiência faz o jogador perceber essa diferença por meio de decisões, consequências e revisão.

**Mostrar:** nome do jogo e opções do menu. Apresentar brevemente a equipe e a disciplina.

### 2. Objetivo educativo e mecânica — 1 minuto e 30 segundos

**Fala sugerida:**

> Os resíduos entram em uma esteira. O jogador deve observar o item mais próximo do fim, destacado por uma seta, e clicar na lixeira correspondente. Não é necessário arrastar nem selecionar o objeto antes.
>
> Cada acerto concede 100 pontos. Cada erro desconta até 50 pontos, mantendo o placar em zero quando não há pontos suficientes. O erro também aumenta a contaminação do lote em 20%. Deixar um item cair tem a mesma consequência de classificá-lo incorretamente. No quinto erro, a contaminação chega a 100% e a fase termina em derrota.
>
> A aprendizagem continua no retorno da interface: o jogo informa o destino correto e, ao vencer, apresenta três cards educativos que priorizam os itens em que o jogador mais errou.

**Mostrar:** instruções e contraste entre caixa de pizza limpa e engordurada. Explicar que as regras ambientais são simplificadas para a experiência e que a própria interface informa essa simplificação.

### 3. Jornada e dificuldade — 1 minuto e 30 segundos

| Fase | Ocorrências na partida | Tipos de itens | Lixeiras | Tempo de travessia | Intervalo de entrada configurado |
|---|---:|---:|---:|---:|---:|
| Casa | 15 | 8 | 4 | 12 s | 6 s |
| Escola | 20 | 11 | 5 | 10 s | 5 s |
| Cooperativa de Reciclagem | 25 | 14 | 6 | 8 s | 4 s |

**Fala sugerida:**

> A versão Alpha possui três fases. Começamos em Casa, com papel, plástico, orgânicos e rejeitos. Na Escola aparecem metal, vidro e o cuidado com objetos quebrados. Na Cooperativa entram papel molhado, garrafa com líquido e pilhas, que possuem coleta especial.
>
> A progressão combina aumento da quantidade de itens, variedade de decisões e velocidade da esteira. As fases são liberadas em sequência após uma vitória. A seleção também mostra as melhores pontuações conquistadas durante aquela sessão.
>
> Uma jornada completa tem 60 ocorrências de resíduos. Isso não significa 60 tipos diferentes: os tipos são reapresentados durante as partidas para reforçar o aprendizado.

**Observação para explicar a tabela:** a primeira entrada ocorre após cerca de um segundo. Os intervalos podem ser antecipados quando a esteira fica vazia. Escola e Cooperativa não usam a lixeira de orgânicos; cada fase tem sua própria seleção, sem acumular obrigatoriamente todas as lixeiras anteriores.

### 4. Organização das pastas — 2 minutos

**Fala sugerida:**

> O projeto foi dividido por responsabilidade. O `index.html` é a entrada e carrega os estilos e scripts. A pasta `dados` concentra o conteúdo e os parâmetros: resíduos, lixeiras, fases, créditos e valores das regras.
>
> Dentro de `js`, a pasta `regras` cuida do funcionamento lógico. Ela calcula movimento, descarte, pontos, contaminação e progresso. A pasta `jogo` transforma essas informações na interface da partida: esteira, lixeiras, placar e mensagens. Já `telas` contém menu, instruções, seleção, abertura, revisão, resultado e créditos.
>
> Os estilos ficam em `css`. Os desenhos vetoriais ficam em `imagens`, e as fontes estão incluídas em `fontes`, com suas licenças. A pasta `testes` contém verificações automatizadas executadas com Node.js. Existe ainda uma configuração em `.github/workflows` para publicação estática no GitHub Pages.
>
> Essa separação permite ajustar, por exemplo, a quantidade de itens de uma fase sem alterar o código que desenha a esteira. Também permite testar as regras sem depender do visual completo.

**Mostrar:** árvore de pastas; abrir `dados/config.js`, uma fase e `js/base.js`. A árvore completa está na segunda parte deste documento.

### 5. Tecnologias e arquitetura — 2 minutos

**Fala sugerida:**

> O jogo usa HTML, CSS e JavaScript puro, sem engine e sem bibliotecas externas. O HTML fornece a estrutura inicial. O CSS organiza o layout, a identidade visual, a responsividade e as animações. O JavaScript cria as telas e controla a partida.
>
> As imagens são SVG, um formato vetorial que mantém a definição ao mudar de tamanho. As fontes Londrina Solid e Lexend são carregadas de arquivos WOFF2 locais. Isso permite executar o projeto localmente sem buscar recursos na internet.
>
> Em `base.js` é criado o objeto global `Reciclando`, que reúne dados e serviços compartilhados. Os arquivos ampliam esse objeto. Cada arquivo costuma usar uma função imediatamente executada para manter variáveis internas isoladas.
>
> A comunicação ocorre por eventos. Quando há um acerto, por exemplo, o motor não precisa desenhar o placar. Ele emite o evento `acerto`, e os componentes interessados reagem: um soma pontos, outro anima o item e outro mostra a mensagem. O `principal.js` conecta a navegação e inicia o ciclo de atualização com `requestAnimationFrame`.

**Mostrar:** ordem dos scripts em `index.html`, `R.eventos` e `R.telas` em `base.js`.

### 6. Rotina interna de uma jogada — 2 minutos

**Fala sugerida:**

> Ao começar uma fase, o programa lê sua configuração e monta uma fila de resíduos. O sorteio embaralha todos os tipos antes de repetir o conjunto. Cada item possui uma posição lógica de zero a um: zero é a entrada e um é o fim da esteira.
>
> A cada quadro, o programa calcula o tempo transcorrido e avança essa posição. A interface converte o progresso em pixels. Ao clicar em uma lixeira, o sistema retira o primeiro item ativo e compara o identificador da lixeira escolhida com o destino cadastrado no resíduo.
>
> O resultado gera um evento de acerto ou erro. Pontuação e contaminação são atualizadas antes do evento que redesenha os indicadores. Depois, o sistema verifica se o lote foi perdido ou se todos os itens foram processados.
>
> Em caso de vitória, a próxima fase é liberada e aparecem os cards, seguidos do resultado. Em caso de derrota, o resultado mostra os erros e permite tentar novamente. O progresso permanece apenas na memória: atualizar a página reinicia a jornada.

**Exemplo oral:** “Uma garrafa PET vazia aponta para `plastico`. Se eu clicar em Plástico, ganho 100 pontos. Se clicar em Papel, perco até 50 pontos e acrescento 20% de contaminação.”

### 7. Demonstração prática — 3 minutos

Prepare o navegador antes de começar. Evite gastar o intervalo inteiro tentando concluir uma fase.

1. **Primeiros 30 segundos:** no menu, abrir Como jogar, apontar a regra do item da vez e voltar para Jogar.
2. **Próximos 30 segundos:** escolher Casa, mostrar a abertura e iniciar. Apontar seta, pontos, contaminação e contador de itens.
3. **Próximos 45 segundos:** fazer um descarte correto e um incorreto; ler o retorno e apontar a lixeira indicada como correta.
4. **Próximos 30 segundos:** pausar com Esc, mostrar Retomar, Reiniciar e Escolher fase; retomar e demonstrar que o movimento continua.
5. **Últimos 45 segundos:** mostrar cards e resultado de uma vitória, se houver tempo. Como alternativa, mostrar a seleção e abrir a Cooperativa pelo modo de teste para comparar velocidade e lixeiras.

**Atalho de apresentação:** na seleção, cinco cliques seguidos no título “Escolha a fase” liberam as três fases. Informar que é um modo de teste. Ele libera o acesso, mas não cria vitórias, pontuações ou cards automaticamente. Não atualizar a página depois de preparar progresso para a demonstração.

**Fala de apoio:**

> Aqui podemos observar a ligação entre ação e aprendizado. O descarte altera os números e produz uma explicação. A pausa interrompe a simulação, e as fases seguintes aumentam a complexidade usando o mesmo motor.

### 8. Testes e qualidade — 1 minuto

**Fala sugerida:**

> O projeto tem duas rotinas de testes automatizados. Uma verifica o motor e os dados da fase Casa, incluindo entrada, movimento, descarte e queda. A outra carrega os scripts reais do HTML em um ambiente com DOM mínimo e verifica a integração das três fases, pontuação, derrota, pausa, bloqueio de cliques e progressão.
>
> A interface também inclui botões navegáveis por teclado, foco visível, mensagens para leitores de tela e tratamento para preferência por menos movimento. Esses recursos precisam ser complementados por avaliação prática no navegador, porque os testes não verificam a aparência nem comprovam acessibilidade completa.

**Mostrar:** comandos e saída dos testes, sem percorrer todas as verificações.

### 9. Estado atual e próximos passos — 1 minuto

**Fala sugerida:**

> A Alpha já permite percorrer três fases com regras, feedback, revisão educativa e resultados. A arquitetura separa conteúdo, simulação e apresentação, facilitando manutenção e expansão.
>
> O README prevê uma quarta fase de resíduos especiais, efeitos sonoros, controle de som e uma tela final da jornada. Parte dos cadastros da quarta fase já existe, mas essa fase ainda não está integrada e seus recursos visuais ainda precisam ser concluídos. A entrega final está prevista no README para 2 de dezembro de 2026.
>
> A principal contribuição do Reciclando é transformar a classificação dos resíduos em uma experiência de decisão e revisão, mostrando que o estado do material influencia o descarte dentro das regras propostas pelo jogo.

## Parte 2 — explicação técnica aprofundada

### 1. Visão geral do software

Reciclando é uma aplicação web estática: seus arquivos são interpretados pelo navegador e toda a lógica da partida é executada no computador do jogador. Não há servidor de aplicação, API remota, autenticação ou banco de dados no código atual.

O funcionamento se organiza em três responsabilidades principais:

| Responsabilidade | Local | Exemplo |
|---|---|---|
| Conteúdo e parâmetros | `dados/` | Destino de uma garrafa e velocidade de uma fase |
| Regras e estado | `js/regras/` | Determinar acerto e finalizar a partida |
| Apresentação e interação | `js/jogo/`, `js/telas/`, `css/` | Mostrar mensagens, botões, telas e animações |

`js/base.js` oferece os serviços comuns e `js/principal.js` faz a ligação do fluxo. A separação lembra uma arquitetura por camadas e usa comunicação por eventos, mas o projeto não implementa formalmente um framework MVC.

### 2. Estrutura completa das pastas e arquivos

```text
Reciclando-main/
├── index.html
├── README.md
├── apresentação.md
├── CREDITOS-DOS-ASSETS.md
├── .nojekyll
├── .github/
│   └── workflows/
│       └── pages.yml
├── .vscode/
│   └── extensions.json
├── dados/
│   ├── config.js
│   ├── creditos.js
│   ├── itens.js
│   ├── lixeiras.js
│   └── fases/
│       ├── fase1-casa.js
│       ├── fase2-escola.js
│       └── fase3-cooperativa.js
├── js/
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
│       ├── creditos.js
│       ├── fases.js
│       ├── abertura.js
│       ├── cards.js
│       └── resultado.js
├── css/
│   ├── base.css
│   ├── jogo.css
│   ├── telas.css
│   ├── cards.css
│   ├── responsivo.css
│   └── prototipo.css
├── imagens/
│   ├── icone.svg
│   ├── cenarios/      (Casa, Escola e Cooperativa)
│   ├── itens/         (16 SVGs dos resíduos das fases atuais)
│   └── lixeiras/      (7 SVGs das categorias utilizadas)
├── fontes/
│   ├── londrina-solid-400.woff2
│   ├── londrina-solid-900.woff2
│   ├── lexend-400.woff2
│   ├── lexend-700.woff2
│   ├── LICENCA-Londrina-Solid.txt
│   └── LICENCA-Lexend.txt
└── testes/
    ├── regras.cjs
    └── interface.cjs
```

O diretório oculto `.git/` mantém os metadados do controle de versão. Ele não participa da execução do jogo. `.vscode/extensions.json` recomenda a extensão `openai.chatgpt`; essa recomendação pertence ao ambiente de desenvolvimento e não é uma dependência da aplicação.

### 3. Tecnologias usadas e recursos disponíveis

| Tecnologia ou recurso | Aplicação concreta |
|---|---|
| HTML5 | Página de entrada, metadados, idioma `pt-BR`, região principal e aviso sem JavaScript |
| CSS | Layout, cores, tipografia, foco, animações e adaptação de tamanho |
| Flexbox e CSS Grid | Organização dos menus, painéis, indicadores e lixeiras |
| Propriedades personalizadas CSS | Valores compartilhados de cores, medidas e estilos por fase |
| Media queries | Ajustes por largura, altura, orientação, ponteiro e movimento reduzido |
| JavaScript moderno | Objetos, funções, closures, template literals, spread, `Map`, `Set` e eventos |
| DOM e eventos do navegador | Criação de elementos, alteração de classes e tratamento de cliques/teclas |
| `requestAnimationFrame` e `performance.now()` | Ciclo de atualização e medição de tempo |
| `ResizeObserver` e evento `resize` | Medição da pista para posicionar os resíduos |
| Web Animations API | Animação do resíduo até a lixeira com `Element.animate()` |
| `matchMedia` | Consulta à preferência de movimento reduzido |
| Page Visibility API | Tratamento de aba oculta e pausa |
| SVG | Desenhos vetoriais e ícones embutidos na interface |
| WOFF2 e `@font-face` | Fontes locais Londrina Solid e Lexend |
| Node.js e CommonJS | Execução dos testes `.cjs`, fora do navegador |
| `node:fs`, `node:path`, `node:vm`, `node:assert/strict` | Leitura dos arquivos, resolução de caminhos, execução isolada e asserções nos testes |
| Git e GitHub Actions | Versionamento e fluxo configurado de publicação |
| YAML e GitHub Pages | Configuração da automação e destino estático previsto |
| Markdown | Documentação do projeto e material de apresentação |
| Python, opcional | Servidor HTTP local pelo módulo `http.server` |

Não há `package.json`, instalação via npm, compilação, bundler ou dependências externas de execução na estrutura examinada. Os scripts do navegador são arquivos clássicos carregados em sequência, sem `import`/`export`. Node.js é necessário para os testes, mas não para jogar. Python é apenas uma alternativa para servir os arquivos.

### 4. Inicialização: do HTML à primeira tela

O `index.html` declara UTF-8, viewport responsivo, título, descrição e ícone SVG. No corpo, o elemento `<main id="palco">` recebe todas as telas criadas por JavaScript. O `<noscript>` avisa quando a execução de JavaScript está desativada.

Os estilos carregados são, nesta ordem, `base.css`, `jogo.css`, `telas.css`, `cards.css` e `responsivo.css`. A ordem permite que ajustes posteriores participem da cascata. `prototipo.css` existe no repositório, mas não está ligado ao HTML atual e não compõe a aparência em execução.

A sequência dos scripts resolve dependências:

1. `base.js` cria o objeto compartilhado e as ferramentas comuns.
2. Os arquivos de dados preenchem configurações, catálogos, fases e créditos.
3. As regras registram o motor e os ouvintes de pontuação, contaminação e progresso.
4. A interface da partida cria suas áreas e registra os componentes visuais.
5. As demais telas são construídas e registradas.
6. `principal.js` valida os dados, define o fluxo, abre o menu e inicia o ciclo de quadros.

Por serem scripts clássicos sem `async` ou `defer`, eles são executados conforme aparecem no documento. Alterar sua ordem pode fazer um arquivo acessar um serviço ainda inexistente.

### 5. `js/base.js`: serviços compartilhados

#### 5.1 Objeto global e isolamento

```js
window.Reciclando = { dados: { fases: [] } };
```

Esse objeto é o ponto de encontro dos componentes. Em vários arquivos ele recebe o apelido `R` dentro de uma função imediatamente executada:

```js
(function (R) {
  'use strict';
  // Variáveis internas ficam limitadas a esta função.
})(window.Reciclando);
```

As funções e variáveis internas ficam protegidas pelo escopo da função. Apenas os membros atribuídos a `R` são compartilhados deliberadamente. Isso reduz nomes soltos no escopo global, embora mantenha dependências no objeto comum e na ordem de carregamento.

#### 5.2 Sistema de eventos

`R.eventos.ouvir(nome, fn)` registra funções e `R.eventos.emitir(nome, dado)` chama os ouvintes daquele nome. É um mecanismo próprio de publicação e assinatura, implementado com um objeto de listas de funções.

A emissão é síncrona: os ouvintes executam imediatamente, na ordem em que foram registrados. Essa propriedade explica por que os pontos já estão disponíveis quando a interface recebe a jogada. Não há fila assíncrona nem mecanismo de remoção de ouvintes nessa implementação.

#### 5.3 Utilitários e DOM

| Serviço | Função |
|---|---|
| `R.util.esc` | Escapa caracteres especiais antes de inserir valores em trechos de HTML |
| `R.util.numero` | Formata números segundo `pt-BR` |
| `R.item` / `R.lixeira` | Localizam registros pelo identificador com `find` |
| `R.dom.criar` | Cria um elemento com classe |
| `R.dom.imagem` | Gera uma imagem com caminho, texto alternativo e classe escapados |
| `R.dom.acoes` | Delega cliques a elementos com `data-acao` |
| `R.icone` | Retorna SVG embutido para o nome de ícone solicitado |

A delegação usa `closest('[data-acao]')`, verifica se o botão pertence ao contêiner e se não está desativado. O contrato da ação é `(evento, botao)`. Desse modo, o contêiner conserva o ouvinte mesmo quando seu conteúdo interno é redesenhado.

O escape reduz a interpretação acidental de textos como marcação HTML nesses pontos. Ele não constitui, isoladamente, uma política completa de segurança para qualquer conteúdo ou URL externa.

#### 5.4 Registro e troca de telas

`R.telas` usa um `Map` para relacionar identificadores a elementos e funções de atualização. `criar` monta uma `section`, inicialmente oculta, dentro de `#palco`. `mostrar` oculta as outras telas, atualiza `atual`, grava `document.body.dataset.tela`, executa o callback e direciona o foco para `[data-foco]` quando existente.

As telas permanecem no documento, alternando `hidden`. A navegação não solicita novas páginas nem muda rotas de URL. `existe` permite verificar se uma tela foi integrada antes de oferecer uma ação.

### 6. Dados: conteúdo separado da lógica

#### 6.1 Configuração geral

`dados/config.js` reúne os valores compartilhados: 100 pontos por acerto, desconto de 50 por erro, 20% de contaminação, limite de 100%, três cards por vitória e cinco cliques para o atalho de teste.

Também define os tempos gerais: espera inicial de 1 segundo, intervalo mínimo de 0,35 segundo entre descartes na mesma lixeira, espera de 1,3 segundo antes da transição de fim e antecipação quando a esteira está vazia. As folgas configuradas para essa antecipação são 0,8 segundo após acerto e 2,5 segundos após erro.

Essas folgas encurtam uma espera maior por meio de `Math.min`; não garantem uma pausa mínima de leitura quando o próximo item já está prestes a entrar. Não há pausa automática da partida após cada erro.

#### 6.2 Catálogo de resíduos

`dados/itens.js` possui 21 registros. Destes, 16 são utilizados no conjunto das três fases atuais e cinco antecipam conteúdo de resíduos especiais. Cada registro pode incluir:

| Campo | Significado |
|---|---|
| `id` | Identificador usado nas referências entre arquivos |
| `nome` | Texto exibido ao jogador |
| `estado` / `condicao` | Condição física e descrição legível |
| `lixeira` | Identificador do destino correto no jogo |
| `imagem` | Caminho para o SVG |
| `dica` | Explicação curta no retorno do erro |
| `explicacao` | Texto aprofundado do card |
| `nota` | Orientação complementar, quando cadastrada |
| `comparar` | Identificador de outro resíduo para comparação |

O motor não deduz o destino por uma inteligência de materiais: ele compara o clique com o campo `lixeira`. O estado físico influencia o conteúdo cadastrado, que já informa o destino.

#### 6.3 Catálogo de lixeiras

`dados/lixeiras.js` contém 12 registros, sete utilizados nas fases atuais. Eles definem nome, tipo comum ou especial, cor, imagem, regra, selo educativo e indicador `reciclavel`.

Esse indicador serve à apresentação do card. Orgânicos, por exemplo, usam um selo sobre compostagem. O acerto depende do identificador de destino, não desse booleano.

#### 6.4 Configuração das fases

Os arquivos de `dados/fases/` adicionam objetos ao array `R.dados.fases` com `push`. Cada fase informa cenário, cor, lixeiras, tipos de resíduos, quantidade total, tempos, abertura e cards padrão.

A ordem de inclusão determina os índices 0, 1 e 2 e a sequência da jornada. O número apresentado ao jogador é o índice acrescido de um.

Os três arquivos também possuem `emDobro`. No código atual, esse campo não é consultado pelo sorteio. Portanto, não há ponderação especial desses resíduos: a fila usa blocos embaralhados do conjunto completo da fase.

### 7. Sorteio dos resíduos

`R.sortearFila(itens, quantidade, aleatorio)` trabalha em blocos. Ele copia a lista de tipos, embaralha essa cópia com o algoritmo Fisher–Yates e a acrescenta à fila. Repete o processo até atingir a quantidade solicitada e corta o excesso.

Na Casa, por exemplo, os oito tipos aparecem uma vez no primeiro bloco. Para completar 15 ocorrências, entram sete posições de um segundo bloco embaralhado. A garantia é apresentar o conjunto antes de repetir o bloco; não existe proibição explícita de dois resíduos iguais ficarem consecutivos na fronteira entre blocos.

O parâmetro `aleatorio` usa `Math.random` por padrão e pode ser substituído por uma função controlada para tornar cenários reproduzíveis. O sorteio rejeita lista vazia ou quantidade inválida.

### 8. Motor da partida: entrada, movimento e saída

`js/regras/partida.js` contém duas partes: uma fábrica de motor independente do DOM, `R.criarPartida`, e o controlador integrado `R.partida`.

#### 8.1 Motor independente

O motor recebe objetos de itens, lixeiras e tempos. Retorna `estado`, `reiniciar`, `atualizar` e `descartar`. A validação inicial rejeita travessia e intervalo não positivos e espera inicial negativa ou não finita.

Cada entrada ativa contém `numero`, `item` e `progresso`. O número identifica aquela ocorrência, mesmo quando o mesmo tipo de resíduo aparece novamente.

O movimento segue a relação:

```text
incremento de progresso = tempo transcorrido / duração da travessia
posição horizontal = progresso × largura medida da pista
```

Com travessia de 12 segundos, seis segundos de movimento representam progresso 0,5. A simulação usa unidades normalizadas; a largura em pixels fica a cargo da interface.

`atualizar(dt)` divide o tempo até os próximos acontecimentos: entrada de um resíduo ou queda do mais antigo. Assim, um avanço de tempo pode processar mais de um evento de forma ordenada. O código usa uma pequena tolerância numérica para comparações de ponto flutuante.

`descartar(id)` só atua quando existe item ativo, a partida ainda não terminou e a lixeira pertence à fase. O primeiro item é retirado com `shift()`. A queda usa a mesma retirada, passando `null` como destino. O motor retorna informações da jogada, inclusive `caiu` e `acertou`.

Ao retirar o último resíduo previsto na fila, o motor marca seu encerramento. Ele não calcula pontuação ou contaminação; essas regras pertencem à integração.

#### 8.2 Controlador integrado

`R.partida.iniciar(indice)` combina os tempos gerais com os da fase, resolve os identificadores em objetos e cria o motor. Reinicia pontos, contaminação, contadores e histórico de erros, sincroniza a lista de itens e emite `fase-iniciada` e `estado-mudou`.

O objeto de estado compartilhado é atualizado com `Object.assign`, preservando sua identidade. Isso permite que componentes que guardaram uma referência a ele continuem observando o estado correto depois de reiniciar.

`atualizar(dt)` bloqueia avanços quando pausada ou encerrada, identifica as novas entradas, emite `item-entrou` e registra as quedas. `descartar(id)` também bloqueia interação quando a aba está oculta e aplica a proteção de clique repetido.

O bloqueio de 0,35 segundo vale para a mesma lixeira do descarte anterior. Clicar em outra lixeira pode produzir uma jogada imediatamente, se houver item disponível.

### 9. Caminho completo de um clique

```text
Clique em um botão data-lixeira
  → js/jogo/lixeiras.js recebe o clique delegado
  → R.partida.descartar(id)
  → motor.descartar(id) retira o item da vez
  → controlador registra acerto ou erro
  → evento acerto/erro
      → pontuação muda
      → contaminação muda, se houver erro
      → item sai da esteira e lixeiras recebem destaque
      → mensagem educativa é atualizada
  → evento estado-mudou atualiza o placar
  → verificação de derrota ou fim da fila
  → evento fase-terminada, se aplicável
```

O clique está efetivamente implementado em `js/jogo/lixeiras.js`, apesar de um comentário desse arquivo mencionar `controles.js`. `controles.js` cuida da pausa e ações relacionadas. Para explicar a rotina, vale seguir o comportamento executado.

No erro, um `Map` acumula quantas vezes cada tipo foi classificado incorretamente. Também guarda a última lixeira escolhida para aquele tipo, ou `null` na queda. O resultado permite revisar frequência e última ocorrência, sem manter um histórico completo de todos os descartes.

### 10. Pontuação, contaminação e encerramento

`pontuacao.js` escuta `acerto` e `erro`. No acerto soma o valor configurado. No erro calcula `Math.max(0, pontos - desconto)`. O campo `jogada.pontos` recebe a variação efetiva: se havia 20 pontos, a perda informada seria 20, e não 50.

Por esse piso aplicado a cada erro, a pontuação final depende da ordem das ações. Não é sempre equivalente a calcular apenas `100 × acertos - 50 × erros` ao terminar.

`contaminacao.js` acrescenta 20 pontos percentuais por erro, limitado a 100, e marca `lotePerdido`. Também fornece o texto do nível e a quantidade de segmentos do medidor. Acertos não reduzem contaminação.

Há vitória quando todos os resíduos previstos foram processados e o lote não foi perdido. Não existe exigência adicional de pontuação mínima. A derrota ocorre ao atingir o limite, mesmo que ainda haja itens por processar. O quinto erro também causa derrota se ocorrer na última ocorrência da fila.

O resultado inclui fase, índice, pontos, contaminação, total previsto, acertos, erros, erros agrupados por item e `venceu`. A emissão de encerramento é protegida contra duplicação pelo estado `terminou`.

### 11. Progresso da jornada

`progresso.js` começa com apenas a fase de índice zero liberada. `podeJogar` valida o índice e a liberação; `estaDisponivel` indica se o índice existe entre as fases integradas. Uma fase pode existir e continuar bloqueada para o jogador.

Ao receber uma vitória, o componente libera a seguinte e registra o resultado se for o primeiro ou se superar os pontos anteriores. `total()` soma as melhores vitórias de cada fase e conta as fases concluídas. Repetir uma fase não acumula indefinidamente novos pontos no total.

As pontuações máximas são 1.500 na Casa, 2.000 na Escola e 2.500 na Cooperativa: 6.000 em uma jornada perfeita. Derrotas não entram nessa soma.

Não há uso de `localStorage`, cookies ou banco para progresso. O `Map` e a variável de liberação vivem na memória da página. `liberarTodas` e seu alias `liberarTudo` ativam o modo de teste sem inventar resultados.

### 12. Ciclo principal e controle do tempo

`principal.js` valida os dados e define `R.fluxo`: início, seleção, abertura da fase, resultado e avanço. O ciclo `quadro(agora)` usa `performance.now()` como referência e solicita a próxima execução com `requestAnimationFrame`.

O delta é convertido de milissegundos para segundos e limitado ao intervalo de 0 a 0,1 segundo. Esse limite evita um salto grande de simulação depois de uma interrupção, mas significa que atrasos maiores não são integralmente recuperados no quadro seguinte.

A lógica da partida avança apenas com a aba visível e a tela `jogo` ativa. Ao mudar a visibilidade, o relógio de referência é atualizado. O componente de controles também pausa a partida quando a aba fica oculta.

Quando chega `fase-terminada`, o resultado fica pendente por 1,3 segundo de atualização visível na tela de jogo, preservando o retorno visual final. Vitória leva aos cards e derrota ao resultado diretamente. Uma nova fase cancela o resultado pendente anterior.

O evento `quadro` continua servindo à interface da tela de jogo; seus componentes verificam o estado para não animar a lona como se a partida estivesse em andamento durante a pausa.

### 13. Componentes da interface da partida

| Arquivo | Responsabilidade efetiva |
|---|---|
| `tela-jogo.js` | Estrutura com placar, cena, esteira, retorno, lixeiras e diálogo de pausa |
| `esteira.js` | Cria desenhos das entradas, posiciona por progresso, destaca o item da vez e anima saídas |
| `lixeiras.js` | Monta os destinos da fase, recebe cliques e destaca acerto, erro e destino correto |
| `controles.js` | Pausa, retomada, reinício, saída, Esc e navegação de foco no diálogo |
| `placar.js` | Mostra pontos, contaminação, fase e quantidade processada |
| `retorno.js` | Exibe explicação da jogada, indicação de queda e variação dos pontos |

#### 13.1 Esteira e animações

A interface mantém um registro de elementos por número de ocorrência. Mede a pista e aplica `translateX` conforme o progresso. Um `ResizeObserver`, quando disponível, e o evento `resize` atualizam a medida.

O item de posição zero na lista recebe a classe `da-vez`. A mudança também atualiza uma mensagem `aria-live`. A textura da lona é movimentada separadamente como efeito visual.

No descarte, `Element.animate()` leva o desenho até a lixeira em aproximadamente 280 ms. Na queda, o CSS aplica uma animação e o elemento é removido após cerca de 520 ms. Quando a preferência consultada indica movimento reduzido, a saída pode ocorrer por remoção direta. Há alternativa de remoção quando a API de animação não está disponível.

#### 13.2 Lixeiras e retorno

Até seis destinos são organizados em uma linha pela lógica de montagem. Acima disso, a função separa comuns e especiais e subdivide cada grupo em blocos de até seis; o CSS responsivo pode reorganizar a apresentação.

Classes temporárias sinalizam acerto, erro e “era aqui”. O retorno apresenta nome do resíduo, destino e dica no caso de descarte incorreto. Uma queda informa que o item passou do fim e mostra o lugar correto. A mensagem permanece até o próximo retorno, sem parar automaticamente a esteira.

### 14. Telas e navegação

| Tela | Comportamento |
|---|---|
| Inicial | Oferece Jogar, Como jogar e Créditos; exibe faixa decorativa de itens |
| Como jogar | Gera instruções e tabela a partir dos itens e lixeiras usados nas fases integradas |
| Créditos | Mostra equipe, disciplina, recursos e referências cadastradas |
| Fases | Exibe bloqueio, conclusão, melhor pontuação e atalho de teste |
| Abertura | Explica ambiente, novidade, lixeiras e quantidade antes de Começar |
| Jogo | Apresenta a simulação e os controles |
| Cards | Revisa três tipos após uma vitória |
| Resultado | Mostra desempenho de vitória ou lista de erros de derrota |

```text
Menu → Seleção → Abertura → Jogo
  ├─ Como jogar → Menu       ├─ Pausa → Retomar / Reiniciar / Seleção
  └─ Créditos → Menu        ├─ Vitória → Cards → Resultado → Próxima abertura
                            └─ Derrota → Resultado → Tentar novamente / Seleção
```

Ao seguir depois da terceira fase, o fluxo atual retorna à seleção. Há estilos e verificações relacionadas a uma tela `final`, mas ela não é criada por nenhum script carregado atualmente.

Reiniciar leva à abertura da fase atual e uma nova partida começa ao clicar em Começar. A derrota também oferece a repetição; não há reinício automático imediato, apesar de um texto de instrução resumir a consequência como recomeçar a fase.

### 15. Cards educativos em detalhe

`R.cards.escolher(resultado)` ordena os erros por frequência decrescente. Em empate, conserva a ordem relativa dos registros. Em seguida completa a seleção com `cardsPadrao` e, se necessário, com os demais tipos da fase, evitando duplicações nessa complementação. Finalmente limita a quantidade ao valor configurado, atualmente três.

Cada card apresenta condição, destino, selo, explicação e nota, se houver. Quando possível, informa a última classificação errada ou a queda. A comparação com outro resíduo só aparece se o item relacionado também fizer parte da fase concluída.

Os botões permitem avançar, voltar e concluir; a leitura não é avaliada nem acrescenta pontos. Na navegação normal, é necessário avançar até Concluir para chegar ao resultado. Se `porFase` for zero, a tela encaminha diretamente ao resultado. Na derrota, o fluxo pula os cards e mostra a lista de erros.

### 16. Identidade visual, responsividade e acessibilidade

`base.css` concentra fontes, tokens visuais, botões, painéis e estrutura. O estilo usa cores chapadas, bordas escuras e sombras duras, descrito no próprio código como papel recortado.

`jogo.css` cuida da partida; `telas.css`, dos menus e painéis; `cards.css`, da revisão. `responsivo.css` acrescenta ajustes para telas menores, ponteiros de toque e orientação horizontal. No celular deitado, por exemplo, a proposta de layout coloca esteira à esquerda e destinos à direita. Há uso de `clamp`, medidas de viewport e áreas seguras do dispositivo.

Os recursos de acessibilidade presentes incluem:

- Idioma do documento e elementos semânticos como `main`, `section`, títulos e botões.
- Navegação padrão dos botões por Tab e ativação por Enter/Espaço.
- Foco visível e movimentação de foco em trocas de tela.
- Diálogo de pausa com atributos ARIA e contenção do ciclo de Tab.
- Mensagens `aria-live` e região de retorno com `role="status"`.
- Textos alternativos e ícones decorativos ocultos para leitores de tela.
- Contaminação representada por segmentos, percentual e texto, além de cor.
- Consulta a `prefers-reduced-motion` no JavaScript e ajustes no CSS.

Essas implementações não equivalem a certificação de acessibilidade ou validação em todos os aparelhos. Legibilidade, navegação assistiva, toque e comportamento visual ainda exigem avaliação em navegadores reais.

### 17. Validação de dados e testes automatizados

`R.validarDados()` percorre as fases antes de abrir o menu. Confere quantidade inteira positiva, existência das lixeiras referenciadas e existência de cada item com destino disponível naquela fase. Uma inconsistência lança erro, em vez de prosseguir silenciosamente.

Essa validação não verifica todo o catálogo, licenças ou existência de imagens. Parte dessas verificações aparece nos testes.

Execute na raiz, com Node.js instalado:

```powershell
node testes/regras.cjs
node testes/interface.cjs
```

**`regras.cjs`:** executa scripts em contexto isolado com `node:vm`, confere o tamanho dos catálogos, os dados e recursos da Casa, rejeição de tempos inválidos, descarte sem item, destino inválido, acerto, erro, múltiplos itens, quedas, reinício, percurso completo e posições em tempos específicos.

**`interface.cjs`:** monta uma simulação mínima de DOM e relógio, carrega os scripts na ordem do HTML, verifica caminhos locais, referências CSS, assinatura WOFF2 e recursos das três fases. Exercita navegação, pontos, pausa, clique repetido, derrota no quinto erro, cards após vitória, desbloqueio sequencial e total perfeito de 6.000 pontos.

As duas rotinas foram executadas com sucesso durante a preparação deste documento. Essa verificação confirma as asserções implementadas; não testa a renderização real, todas as ações possíveis dos cards, compatibilidade completa ou a publicação remota.

### 18. Execução e publicação

Para jogar localmente, abrir `index.html` em um navegador moderno, preservando a estrutura de pastas. Os recursos necessários às três fases estão no repositório, permitindo uso local sem internet.

Opcionalmente, servir por HTTP na raiz:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Depois, abrir `http://127.0.0.1:8000`. O servidor apenas entrega arquivos: a partida continua sendo calculada no navegador.

O arquivo `.github/workflows/pages.yml` configura publicação em pushes para `main` e execução manual. O fluxo usa runner Ubuntu, checkout, configuração do Pages, preparação de `_site`, envio de artefato e publicação. As permissões declaradas permitem leitura de conteúdo e escrita para Pages, com token de identidade.

**Limitação observada:** a etapa de preparação copia `index.html`, `.nojekyll`, `css`, `dados`, `imagens` e `js`, mas não copia `fontes/`. Como `base.css` referencia as fontes locais, esse pacote de publicação fica sem os arquivos WOFF2 e pode usar fontes alternativas. É um ajuste pendente no fluxo; o funcionamento local e os testes de arquivos na raiz não comprovam a integridade desse pacote.

`.nojekyll` sinaliza a publicação estática sem processamento por Jekyll. A presença do workflow demonstra configuração de automação, não comprova que o serviço já esteja habilitado ou que uma publicação tenha sido concluída. O endereço Vercel citado nos documentos é uma referência visual; não há configuração específica de Vercel entre os arquivos examinados.

### 19. Recursos, créditos e referências internas

As ilustrações são SVGs locais. `CREDITOS-DOS-ASSETS.md` atribui os desenhos originais e o ícone a produção para o projeto com apoio de IA generativa, e informa adaptação de estilos, templates e ícones da versão pública de referência. `dados/creditos.js` registra a equipe, apoio de IA e as fontes.

As fontes possuem licença SIL Open Font License 1.1, incluída em arquivos próprios. O documento de créditos ainda descreve oito desenhos e quatro lixeiras, enquanto a estrutura atual contém 16 desenhos de resíduos e sete lixeiras. Convém atualizar esse inventário na documentação de recursos.

Os créditos citam a Resolução CONAMA nº 275/2001 e a Lei nº 12.305/2010 como referências do projeto. Aqui essas citações descrevem o conteúdo cadastrado, sem fazer validação jurídica ou ambiental independente. O jogo informa que regras locais podem variar e que sua classificação foi simplificada.

Alguns comentários mencionam seções de um GDD, mas esse documento não está entre os arquivos desta cópia. O README também menciona Trello como acompanhamento de tarefas, sem integração executável com o jogo.

### 20. O que está pronto, preparado e planejado

| Situação | Conteúdo |
|---|---|
| Implementado | Três fases, sorteio, esteira, descarte, pontos, contaminação, pausa, resultados, cards, progresso em memória e créditos |
| Implementado como apoio | Atalho de liberação, testes Node.js e configuração de publicação |
| Cadastrado para expansão | Cinco resíduos especiais e cinco destinos adicionais nos catálogos |
| Estrutura visual antecipada | Organização para mais lixeiras, estilos de tela final e ícones de som |
| Planejado no README | Quarta fase com 30 ocorrências e 12 lixeiras, efeitos sonoros, controle de som e tela final |
| Pendências observadas | Recursos visuais dos cadastros futuros, inclusão de fontes no pacote Pages e atualização do inventário de créditos |

Os cinco resíduos futuros são celular antigo, lâmpada fluorescente, medicamento vencido, embalagem química e seringa. Seus caminhos de imagem e os das cinco lixeiras correspondentes estão cadastrados, mas os SVGs não existem nesta cópia. Como esses registros não entram nas fases atuais, os testes das fases jogáveis não exigem esses arquivos.

Não há arquivo de configuração da quarta fase nem script que a carregue. Não há reprodução de áudio implementada. Os ícones de som existentes em `base.js` não constituem controle sonoro funcional. Da mesma forma, `emDobro` não altera a probabilidade de sorteio.

### 21. Como ampliar o projeto mantendo a organização

Para acrescentar uma fase, cadastrar os resíduos e destinos necessários, criar suas imagens, escrever o objeto da fase e incluir seu script no grupo de dados do HTML. Os identificadores precisam ser coerentes, e todo destino usado por um item deve estar disponível na fase.

A lógica de esteira e descarte pode ser reaproveitada. A tela de seleção lê o array de fases, e a interface das lixeiras já possui divisão para quantidades maiores. Isso facilita a expansão, mas não elimina a necessidade de verificar layout, ritmo, explicações e recursos de cada nova fase.

Para alterar a dificuldade, os principais pontos são quantidade, variedade, travessia e intervalo em `dados/fases/`. Para alterar recompensa e tolerância ao erro, usar `dados/config.js`. Modificações estruturais podem exigir atualização dos testes que hoje esperam três fases e quantidades específicas.

Persistência de progresso, áudio e uma tela final exigiriam implementação adicional; não surgem apenas pela edição dos textos de configuração.

### 22. Perguntas prováveis da banca

**Por que usar JavaScript puro?**  
A solução atual atende à escala de um jogo 2D baseado em elementos de interface, com distribuição simples e sem instalação de dependências para o jogador. O custo é manter manualmente navegação, eventos e organização das dependências.

**Existe uma engine?**  
Não há engine externa. O próprio projeto implementa um pequeno motor de fila, tempo, movimento e descarte, enquanto DOM, CSS e APIs do navegador apresentam a experiência.

**O jogo usa Canvas?**  
Não. A cena é composta por elementos HTML, imagens SVG e estilos. O deslocamento usa transformações CSS e a saída até a lixeira usa a Web Animations API.

**Como as regras sabem a lixeira correta?**  
Cada resíduo possui um identificador de destino no catálogo. O motor compara esse identificador com o botão escolhido. As diferenças entre limpo, sujo ou molhado estão representadas em registros distintos.

**Como é garantida a variedade?**  
O sorteio embaralha todos os tipos em blocos antes de repetir o conjunto. O campo `emDobro`, apesar de cadastrado, não participa dessa rotina na versão atual.

**Como se vence e como se perde?**  
Vence ao processar a quantidade prevista sem perder o lote. Perde ao atingir 100% de contaminação, atualmente no quinto erro. Quedas também contam como erro.

**O progresso fica salvo?**  
Somente durante a sessão da página. A atualização limpa os resultados e a liberação das fases.

**A quarta fase já está disponível?**  
Não. Existem cadastros antecipados, mas faltam a configuração da fase, recursos visuais e integração.

**Os testes substituem jogar no navegador?**  
Não. Eles verificam regras e integração sob condições simuladas. Aparência, usabilidade e tecnologias assistivas precisam de avaliação prática.

**Qual é a ideia principal da arquitetura?**  
Manter conteúdo em dados, decisões nas regras e representação na interface, conectando essas responsabilidades por serviços comuns e eventos.

### 23. Arquivos de referência para estudar antes da apresentação

1. `index.html`: ordem de carregamento e entrada da aplicação.
2. `js/base.js`: objeto comum, eventos, utilitários e gerenciador de telas.
3. `dados/config.js` e `dados/fases/fase1-casa.js`: números e configuração de conteúdo.
4. `js/regras/sorteio.js` e `js/regras/partida.js`: funcionamento central.
5. `js/regras/pontuacao.js`, `contaminacao.js` e `progresso.js`: consequências e jornada.
6. `js/jogo/lixeiras.js` e `esteira.js`: ligação entre clique, estado e desenho.
7. `js/telas/cards.js` e `resultado.js`: revisão e encerramento.
8. `js/principal.js`: fluxo e ciclo de atualização.
9. `testes/`: evidências automatizadas do comportamento.
10. `README.md`, `CREDITOS-DOS-ASSETS.md` e `.github/workflows/pages.yml`: execução, recursos, planejamento e publicação.
