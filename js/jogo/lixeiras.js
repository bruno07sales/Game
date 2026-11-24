/* ==========================================================================
   RECICLANDO — js/jogo/lixeiras.js                (GDD, seções 21 e 23)
   Desenha as lixeiras da fase e mostra nelas o resultado de cada descarte.

   A quantidade de lixeiras vem da fase (dados/fases/). A tela se organiza
   sozinha:
     - até 6 lixeiras ..... uma linha só;
     - mais de 6 .......... uma linha para as lixeiras comuns e outra para
                            os pontos de coleta especial.

   O clique na lixeira é tratado em js/jogo/controles.js.
   ========================================================================== */
(function (R) {
  'use strict';

  const area = R.telaJogo.area('lixeiras');
  const MAXIMO_POR_LINHA = 6;

  /* ---- Começo de fase: monta as lixeiras ---- */
  R.eventos.ouvir('fase-iniciada', (dados) => {
    const linhas = separarEmLinhas(dados.fase.lixeiras.map((id) => R.lixeira(id)));
    const maiorLinha = Math.max.apply(null, linhas.map((linha) => linha.length));

    area.dataset.linhas = linhas.length;
    area.style.setProperty('--por-linha', maiorLinha);
    area.innerHTML = linhas.map((linha) =>
      '<div class="lixeiras-linha">' + linha.map(desenhar).join('') + '</div>').join('');
  });

  function separarEmLinhas(lixeiras) {
    if (lixeiras.length <= MAXIMO_POR_LINHA) return [lixeiras];
    const comuns = lixeiras.filter((lixeira) => lixeira.tipo !== 'especial');
    const especiais = lixeiras.filter((lixeira) => lixeira.tipo === 'especial');
    const linhas = [];
    [comuns, especiais].forEach((grupo) => {
      for (let i = 0; i < grupo.length; i += MAXIMO_POR_LINHA) {
        linhas.push(grupo.slice(i, i + MAXIMO_POR_LINHA));
      }
    });
    return linhas;
  }

  function desenhar(lixeira) {
    const esc = R.util.esc;
    return `
      <button type="button" class="lixeira lixeira-${esc(lixeira.tipo)}" data-lixeira="${esc(lixeira.id)}" style="--cor: ${esc(lixeira.cor)}">
        <span class="lixeira-figura">
          ${R.dom.imagem(lixeira.imagem, lixeira.nome, 'lixeira-imagem')}
          <span class="lixeira-marca lixeira-marca-certo" aria-hidden="true">${R.icone('certo')}</span>
          <span class="lixeira-marca lixeira-marca-errado" aria-hidden="true">${R.icone('errado')}</span>
        </span>
        <span class="lixeira-nome">${esc(lixeira.nome)}</span>
      </button>`;
  }

  /* ---- Resultado do descarte, mostrado na própria lixeira ---- */
  R.eventos.ouvir('acerto', (jogada) => {
    marcar(jogada.lixeiraEscolhida.id, 'acertou', 700);
  });

  R.eventos.ouvir('erro', (jogada) => {
    if (jogada.lixeiraEscolhida) marcar(jogada.lixeiraEscolhida.id, 'errou', 900);
    // Mostra onde o item deveria ter ido.
    marcar(jogada.lixeiraCerta.id, 'era-aqui', 1800);
  });

  // Põe uma classe na lixeira por um tempo. O CSS faz o efeito.
  const relogios = {};
  function marcar(id, classe, milissegundos) {
    const botao = area.querySelector('[data-lixeira="' + id + '"]');
    if (!botao) return;
    const chave = id + '/' + classe;
    clearTimeout(relogios[chave]);
    botao.classList.remove(classe);
    void botao.offsetWidth; // faz a animação recomeçar se a classe já estava lá
    botao.classList.add(classe);
    relogios[chave] = setTimeout(() => botao.classList.remove(classe), milissegundos);
  }
  area.addEventListener('click', evento => {
    const botao = evento.target.closest('[data-lixeira]');
    if (botao && area.contains(botao)) R.partida.descartar(botao.dataset.lixeira);
  });
})(window.Reciclando);
