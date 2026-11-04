/* ==========================================================================
   RECICLANDO — js/jogo/retorno.js                 (GDD, seções 4.3 e 10)
   O retorno (feedback) de cada descarte, na faixa entre a esteira e as
   lixeiras.

     Acerto ... faixa verde, "Correto!" e os pontos ganhos.
     Erro ..... faixa vermelha com a explicação: por que está errado (a
                "dica" do item, em dados/itens.js) e qual é o lugar certo.
     Queda .... o item caiu da esteira: também é erro.

   A mensagem fica na tela até o próximo descarte. A esteira não espera o
   jogador ler: quem garante a revisão são os cards do fim da fase.
   ========================================================================== */
(function (R) {
  'use strict';

  const area = R.telaJogo.area('retorno');
  const cena = R.telaJogo.area('cena');
  const esc = R.util.esc;

  /* ---- Começo de fase: instrução ---- */
  R.eventos.ouvir('fase-iniciada', () => {
    mostrar('dica', R.icone('seta'),
      'O item marcado com a seta é o <strong>item da vez</strong>. Clique na lixeira certa para ele antes que caia da esteira.',
      0);
  });

  /* ---- Acerto ---- */
  R.eventos.ouvir('acerto', (jogada) => {
    mostrar('certo', R.icone('certo'),
      '<strong>Correto!</strong> ' + esc(jogada.item.nome) + ' vai em ' + esc(jogada.lixeiraCerta.nome) + '.',
      jogada.pontos);
  });

  /* ---- Erro ---- */
  R.eventos.ouvir('erro', (jogada) => {
    const nome = '<strong>' + esc(jogada.item.nome) + '</strong>';
    const lugarCerto = ' Lugar certo: <strong>' + esc(jogada.lixeiraCerta.nome) + '</strong>.';

    if (jogada.caiu) {
      mostrar('errado', R.icone('queda'),
        nome + ' caiu da esteira antes da triagem.' + lugarCerto,
        jogada.pontos);
    } else {
      mostrar('errado', R.icone('errado'),
        nome + ' não vai em ' + esc(jogada.lixeiraEscolhida.nome) + '. ' +
        esc(jogada.item.dica || '') + lugarCerto,
        jogada.pontos);
    }

    // Um piscar vermelho na cena reforça o erro.
    cena.classList.remove('cena-erro');
    void cena.offsetWidth;
    cena.classList.add('cena-erro');
  });

  function mostrar(tipo, icone, html, pontos) {
    let selo = '';
    if (pontos > 0) selo = '<span class="retorno-pontos">+' + R.util.numero(pontos) + '</span>';
    if (pontos < 0) selo = '<span class="retorno-pontos">−' + R.util.numero(-pontos) + '</span>';

    area.className = 'retorno retorno-' + tipo;
    area.innerHTML =
      '<span class="retorno-icone" aria-hidden="true">' + icone + '</span>' +
      '<p class="retorno-texto">' + html + '</p>' + selo;

    // Faz a animação de entrada recomeçar a cada mensagem.
    area.classList.remove('entrou');
    void area.offsetWidth;
    area.classList.add('entrou');
  }
})(window.Reciclando);
