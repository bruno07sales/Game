/* ==========================================================================
   RECICLANDO — js/jogo/tela-jogo.js               (GDD, seções 21 e 22.3)
   A tela de jogo: monta o "esqueleto" da tela, faz o tempo andar e cuida
   da pausa.

   A tela é dividida em áreas. Cada área é preenchida por um arquivo:
     placar ..... js/jogo/placar.js    (pontos, contaminação, itens)
     esteira .... js/jogo/esteira.js   (os itens andando)
     retorno .... js/jogo/retorno.js   (a faixa de "Correto!" e de erro)
     lixeiras ... js/jogo/lixeiras.js  (as lixeiras) + controles.js (o clique)
   Se um desses arquivos ainda não existir, a área fica vazia e o resto
   continua funcionando.
   ========================================================================== */
(function (R) {
  'use strict';

  const tela = R.telas.criar('jogo', `
    <header class="jogo-topo">
      <button type="button" class="botao-redondo" data-acao="pausar" aria-label="Pausar o jogo" title="Pausar (tecla Esc)">
        ${R.icone('pausa')}
      </button>
      <div class="placar" data-area="placar"></div>
    </header>

    <div class="cena" data-area="cena">
      <div class="esteira" data-area="esteira"></div>
    </div>

    <div class="retorno" data-area="retorno" role="status" aria-live="polite"></div>

    <div class="lixeiras" data-area="lixeiras"></div>

    <div class="painel-fundo" data-area="pausa" hidden>
      <div class="painel" role="dialog" aria-modal="true" aria-labelledby="titulo-pausa">
        <h2 id="titulo-pausa">Jogo pausado</h2>
        <p>A esteira está parada. Nada é perdido enquanto o jogo está em pausa.</p>
        <div class="painel-botoes">
          <button type="button" class="botao botao-principal" data-acao="continuar">Continuar</button>
          <button type="button" class="botao" data-acao="recomecar">Recomeçar a fase</button>
          <button type="button" class="botao" data-acao="sair">Sair da fase</button>
        </div>
      </div>
    </div>
  `, aoMostrar);

  const painelDePausa = tela.querySelector('[data-area="pausa"]');

  // Os outros arquivos da pasta js/jogo/ pegam a sua área por aqui.
  R.telaJogo = {
    elemento: tela,
    area(nome) {
      return tela.querySelector('[data-area="' + nome + '"]');
    }
  };

  /* ------------------------------------------------------------------------
     O TEMPO
     O navegador chama "quadro" dezenas de vezes por segundo. A cada vez, as
     regras avançam um pouquinho (R.partida.atualizar) e quem desenha é
     avisado (evento 'quadro').
     ------------------------------------------------------------------------ */
  let pedido = null;      // o próximo quadro pedido ao navegador
  let ultimoInstante = 0;

  function quadro(agora) {
    // dt = segundos desde o quadro anterior. O limite de 0,1 s evita um
    // "salto" na esteira quando o navegador fica um tempo sem desenhar.
    const dt = Math.min(Math.max(agora - ultimoInstante, 0) / 1000, 0.1);
    ultimoInstante = agora;
    R.partida.atualizar(dt);
    R.eventos.emitir('quadro', dt);
    pedido = requestAnimationFrame(quadro);
  }

  function ligarTempo() {
    desligarTempo(); // garante que nunca há dois "relógios" ao mesmo tempo
    ultimoInstante = performance.now();
    pedido = requestAnimationFrame(quadro);
  }

  function desligarTempo() {
    if (pedido !== null) cancelAnimationFrame(pedido);
    pedido = null;
  }

  // Chamada quando a tela de jogo aparece: começa a fase pedida.
  function aoMostrar(dados) {
    painelDePausa.hidden = true;
    R.partida.iniciar(dados.fase, dados.indice);
    ligarTempo();
  }

  // Saiu da tela de jogo: o tempo para.
  R.eventos.ouvir('tela-mudou', (dados) => {
    if (dados.tela !== 'jogo') desligarTempo();
  });

  /* ------------------------------------------------------------------------
     A PAUSA
     ------------------------------------------------------------------------ */
  function pausar() {
    const estado = R.partida.estado;
    if (R.telas.atual !== 'jogo' || estado.terminou || estado.pausada) return;
    R.partida.pausar();
    painelDePausa.hidden = false;
    painelDePausa.querySelector('[data-acao="continuar"]').focus();
  }

  function continuar() {
    painelDePausa.hidden = true;
    R.partida.retomar();
  }

  R.dom.acoes(tela, {
    pausar: pausar,
    continuar: continuar,
    recomecar() {
      const estado = R.partida.estado;
      R.fluxo.jogar(estado.indiceDaFase);
    },
    sair() {
      painelDePausa.hidden = true;
      R.fluxo.sairDaFase();
    }
  });

  // Tecla Esc: pausa e continua.
  document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape' || R.telas.atual !== 'jogo') return;
    if (R.partida.estado.pausada) continuar();
    else pausar();
  });

  // Trocou de aba ou minimizou a janela: pausa sozinho.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausar();
  });
})(window.Reciclando);
