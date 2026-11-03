/* ==========================================================================
   RECICLANDO — js/jogo/esteira.js                 (GDD, seções 5 e 21)
   Desenha a esteira e os itens andando sobre ela.

   Este arquivo só DESENHA. Onde cada item está (o "progresso", de 0 a 1)
   quem decide é js/regras/partida.js. Aqui o progresso vira posição na
   tela:   posição = progresso × comprimento da pista.

   O ITEM DA VEZ (o mais perto do fim) ganha a classe "da-vez", que o CSS
   usa para destacar: seta em cima, tamanho maior e etiqueta amarela.
   ========================================================================== */
(function (R) {
  'use strict';

  const area = R.telaJogo.area('esteira');
  const cena = R.telaJogo.area('cena');
  const estado = R.partida.estado;

  area.innerHTML = `
    <div class="esteira-lona" aria-hidden="true"></div>
    <div class="esteira-rolos" aria-hidden="true"></div>
    <div class="esteira-fim" aria-hidden="true"></div>
    <div class="esteira-pista"></div>
    <div class="esteira-boca" aria-hidden="true"></div>
    <p class="so-leitor" aria-live="polite" data-vez></p>
  `;

  const pista = area.querySelector('.esteira-pista');
  const lona = area.querySelector('.esteira-lona');
  const avisoDaVez = area.querySelector('[data-vez]');

  const elementos = {};   // número da entrada -> elemento do item na tela
  let comprimento = 0;    // comprimento da pista, em pixels
  let deslocamento = 0;   // quanto a lona já "andou" (só para o desenho)
  let numeroDaVez = null;

  const poucoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function medir() {
    comprimento = pista.clientWidth;
  }
  window.addEventListener('resize', medir);
  if (window.ResizeObserver) new ResizeObserver(medir).observe(pista);

  /* ---- Começo de fase: limpa a esteira e troca o cenário ---- */
  R.eventos.ouvir('fase-iniciada', (dados) => {
    pista.innerHTML = '';
    Object.keys(elementos).forEach((numero) => { delete elementos[numero]; });
    numeroDaVez = null;
    avisoDaVez.textContent = '';

    cena.style.setProperty('--cor-da-cena', dados.fase.cor || '');
    cena.style.backgroundImage = dados.fase.cenario ? 'url("' + dados.fase.cenario + '")' : 'none';
    medir();
  });

  /* ---- Um item entrou na esteira ---- */
  R.eventos.ouvir('item-entrou', (entrada) => {
    const item = entrada.item;
    const elemento = R.dom.criar('div', 'item');
    elemento.innerHTML = `
      <div class="item-corpo">
        <span class="item-seta" aria-hidden="true">${R.icone('seta')}</span>
        ${R.dom.imagem(item.imagem, item.nome, 'item-imagem')}
        <span class="item-etiqueta"><span class="item-nome">${R.util.esc(item.nome)}</span></span>
      </div>`;
    elementos[entrada.numero] = elemento;
    pista.appendChild(elemento);
    posicionar();
  });

  /* ---- A cada quadro: põe cada item no seu lugar ---- */
  R.eventos.ouvir('quadro', (dt) => {
    posicionar();
    // A lona anda na mesma velocidade dos itens (só enfeite).
    if (!estado.pausada && !estado.terminou && estado.fase) {
      deslocamento += dt * comprimento / estado.fase.esteira.travessia;
      lona.style.backgroundPositionX = deslocamento.toFixed(1) + 'px';
    }
  });

  function posicionar() {
    estado.naEsteira.forEach((entrada, posicao) => {
      const elemento = elementos[entrada.numero];
      if (!elemento) return;
      elemento.style.transform = 'translateX(' + (entrada.progresso * comprimento).toFixed(1) + 'px)';
      elemento.classList.toggle('da-vez', posicao === 0);
    });

    // Avisa (para leitores de tela) quando o item da vez muda.
    const daVez = estado.naEsteira[0];
    const numero = daVez ? daVez.numero : null;
    if (numero !== numeroDaVez) {
      numeroDaVez = numero;
      avisoDaVez.textContent = daVez ? 'Item da vez: ' + daVez.item.nome : '';
    }
  }

  /* ---- Um item saiu da esteira: foi para uma lixeira ou caiu ---- */
  R.eventos.ouvir('acerto', sair);
  R.eventos.ouvir('erro', sair);

  function sair(jogada) {
    const elemento = elementos[jogada.entrada.numero];
    if (!elemento) return;
    delete elementos[jogada.entrada.numero];
    elemento.classList.remove('da-vez');

    if (poucoMovimento) {
      elemento.remove();
    } else if (jogada.caiu) {
      elemento.classList.add('caindo'); // a animação da queda está no CSS
      setTimeout(() => elemento.remove(), 520);
    } else {
      voarAte(elemento, jogada.lixeiraEscolhida.id);
    }
  }

  // Leva o desenho do item até a lixeira escolhida e some com ele.
  function voarAte(elemento, idDaLixeira) {
    const corpo = elemento.querySelector('.item-corpo');
    const lixeira = R.telaJogo.elemento.querySelector('[data-lixeira="' + idDaLixeira + '"]');
    if (!lixeira || !corpo.animate) {
      elemento.remove();
      return;
    }
    const de = corpo.getBoundingClientRect();
    const para = lixeira.getBoundingClientRect();
    const dx = (para.left + para.width / 2) - (de.left + de.width / 2);
    const dy = (para.top + para.height * 0.35) - (de.top + de.height / 2);

    elemento.classList.add('voando');
    corpo.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(0.3)', opacity: 0.35 }
    ], { duration: 280, easing: 'ease-in', fill: 'forwards' })
      .onfinish = () => elemento.remove();
  }
})(window.Reciclando);
