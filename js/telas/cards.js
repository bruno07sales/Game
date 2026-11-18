/* ==========================================================================
   RECICLANDO — js/telas/cards.js                  (GDD, seções 12 e 22.4)
   Os cards educativos do fim de cada fase vencida.

   QUAIS CARDS APARECEM (3 por fase; a quantidade fica em dados/config.js):
     1º  os itens que o jogador errou nesta fase, do mais errado para o
         menos errado. Cada um diz qual foi o erro: em que lixeira o item
         foi colocado, ou que ele caiu da esteira;
     2º  se faltar card para completar, entram os "cardsPadrao" da fase
         (dados/fases/).
   Se o jogador não errou nada, a tela diz isso e mostra só os cards padrão.

   O texto de cada card vem do item (dados/itens.js): condição, lugar
   certo, explicação, nota e o item de comparação (mesmo material em outro
   estado). Não há prova nem pontos: ler os cards não é obrigatório.
   ========================================================================== */
(function (R) {
  'use strict';

  /* ------------------------------------------------------------------------
     ESCOLHA DOS CARDS
     Devolve uma lista de { item, errou, vezes, lixeira }.
     ------------------------------------------------------------------------ */
  function escolher(resultado) {
    const quantidade = R.dados.config.cards.porFase;
    const fase = resultado.fase;
    const escolhidos = [];
    const jaTem = (item) => escolhidos.some((card) => card.item.id === item.id);

    // 1º: os itens errados. O sort mantém a ordem dos erros em caso de empate.
    resultado.errosPorItem.slice()
      .sort((a, b) => b.vezes - a.vezes)
      .forEach((erro) => {
        escolhidos.push({ item: erro.item, errou: true, vezes: erro.vezes, lixeira: erro.lixeira });
      });

    // 2º: os cards padrão da fase e, se ainda faltar, os outros itens dela.
    (fase.cardsPadrao || []).concat(fase.itens).forEach((id) => {
      const item = R.item(id);
      if (item && !jaTem(item)) escolhidos.push({ item: item, errou: false, vezes: 0, lixeira: null });
    });

    return escolhidos.slice(0, quantidade);
  }

  /* ------------------------------------------------------------------------
     A TELA
     ------------------------------------------------------------------------ */
  const tela = R.telas.criar('cards', `
    <div class="cards-pagina">
      <header class="cards-topo">
        <h1 data-foco tabindex="-1" data-titulo></h1>
        <p class="cards-resumo" data-resumo></p>
      </header>

      <article class="card" data-card aria-live="polite"></article>

      <footer class="cards-rodape">
        <button type="button" class="botao" data-acao="voltar">Voltar</button>
        <span class="cards-contagem" data-contagem></span>
        <button type="button" class="botao botao-principal" data-acao="proximo">Próximo</button>
      </footer>
    </div>
  `, aoMostrar);

  let resultadoAtual = null;
  let cards = [];
  let posicao = 0;

  function aoMostrar(resultado) {
    resultadoAtual = resultado;
    cards = escolher(resultado);
    posicao = 0;
    if (!cards.length) { // cards desligados em config.js (porFase: 0)
      R.fluxo.resultado(resultado);
      return;
    }

    const errados = resultado.errosPorItem.length;
    let resumo = 'Você não errou nenhum item nesta fase. Estes cards revisam as regras mais importantes.';
    if (errados === 1) resumo = 'Você errou 1 item nesta fase. Os cards começam por ele.';
    if (errados > 1) resumo = 'Você errou ' + errados + ' itens diferentes nesta fase. Os cards começam por eles.';
    if (errados > cards.length) {
      resumo = 'Você errou ' + errados + ' itens diferentes nesta fase. Os cards mostram ' + cards.length + ' deles.';
    }

    tela.querySelector('[data-titulo]').textContent =
      'Revisão da fase ' + (resultado.indiceDaFase + 1) + ': ' + resultado.fase.nome;
    tela.querySelector('[data-resumo]').textContent = resumo;
    desenhar();
  }

  function desenhar() {
    const esc = R.util.esc;
    const card = cards[posicao];
    const item = card.item;
    const fase = resultadoAtual.fase;
    const lixeira = R.lixeira(R.partida.lixeiraCerta(item, fase));
    const condicao = item.condicao || (R.dados.config.estados[item.estado] || '');

    // A menção ao erro do jogador.
    let erro = '';
    if (card.errou) {
      const onde = card.lixeira ? 'colocou em ' + card.lixeira.nome : 'deixou cair da esteira';
      const texto = card.vezes > 1
        ? 'Você errou este item ' + card.vezes + ' vezes. Na última, ' + onde + '.'
        : 'Você errou este item: ' + onde + '.';
      erro = '<p class="card-erro">' + R.icone('errado') + '<span>' + esc(texto) + '</span></p>';
    }

    // Comparação com o mesmo material em outro estado (só se ele existe nesta fase).
    let comparar = '';
    const outro = item.comparar ? R.item(item.comparar) : null;
    if (outro && fase.itens.indexOf(outro.id) !== -1) {
      const lixeiraDoOutro = R.lixeira(R.partida.lixeiraCerta(outro, fase));
      comparar = `
        <div class="card-comparar">
          ${R.dom.imagem(outro.imagem, '', 'card-comparar-figura')}
          <p><span class="card-comparar-titulo">Compare:</span>
             <strong>${esc(outro.nome)}</strong> vai em <strong>${esc(lixeiraDoOutro.nome)}</strong>.</p>
        </div>`;
    }

    const elemento = tela.querySelector('[data-card]');
    elemento.className = 'card' + (card.errou ? ' card-errado' : '');
    elemento.innerHTML = `
      ${erro}
      <div class="card-corpo">
        <div class="card-figura">${R.dom.imagem(item.imagem, '', 'card-imagem')}</div>
        <div class="card-dados">
          <h2 class="card-nome">${esc(item.nome)}</h2>
          <dl class="card-lista">
            <div><dt>Condição</dt><dd>${esc(condicao)}</dd></div>
            <div>
              <dt>Lugar certo</dt>
              <dd class="card-destino" style="--cor: ${esc(lixeira.cor)}">
                ${R.dom.imagem(lixeira.imagem, '', 'card-destino-figura')}
                <span>${esc(lixeira.nome)}</span>
              </dd>
            </div>
          </dl>
          <p class="card-selo ${lixeira.reciclavel ? 'card-selo-sim' : 'card-selo-nao'}">
            ${R.icone(lixeira.reciclavel ? 'reciclavel' : 'atencao')}<span>${esc(lixeira.selo || '')}</span>
          </p>
        </div>
      </div>
      <p class="card-explicacao">${esc(item.explicacao || '')}</p>
      ${item.nota ? '<p class="card-nota">' + esc(item.nota) + '</p>' : ''}
      ${comparar}`;

    const ultimo = posicao === cards.length - 1;
    tela.querySelector('[data-contagem]').textContent = 'Card ' + (posicao + 1) + ' de ' + cards.length;
    tela.querySelector('[data-acao="voltar"]').hidden = posicao === 0;
    tela.querySelector('[data-acao="proximo"]').textContent = ultimo ? 'Concluir' : 'Próximo';
  }

  R.dom.acoes(tela, {
    voltar() {
      if (posicao === 0) return;
      posicao--;
      desenhar();
      R.eventos.emitir('card-trocado', { posicao: posicao });
    },
    proximo() {
      if (posicao < cards.length - 1) {
        posicao++;
        desenhar();
        R.eventos.emitir('card-trocado', { posicao: posicao });
      } else {
        R.eventos.emitir('cards-concluidos', resultadoAtual);
        R.fluxo.resultado(resultadoAtual);
      }
    }
  });

  // Fica disponível para testes e para quem quiser reaproveitar a escolha.
  R.cards = { escolher: escolher };
})(window.Reciclando);
