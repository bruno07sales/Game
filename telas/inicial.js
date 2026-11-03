/* ==========================================================================
   RECICLANDO — js/telas/inicial.js                (GDD, seção 22.1)
   A tela inicial: logo e botões Jogar, Como jogar e Créditos.

   O botão "Sair" do GDD não existe: uma página web não consegue fechar a
   própria aba do navegador.

   A faixa com itens andando embaixo do logo é só enfeite: usa os desenhos
   dos primeiros itens de dados/itens.js.
   ========================================================================== */
(function (R) {
  'use strict';

  const creditos = R.dados.creditos || {};
  const rodape = [creditos.disciplina, creditos.instituicao, creditos.semestre].filter(Boolean).join(', ');

  const tela = R.telas.criar('inicial', `
    <div class="inicial-centro">
      <h1 class="logo" data-foco tabindex="-1">Reciclando</h1>
      <p class="inicial-resumo">Separe cada resíduo na lixeira certa antes que o lote seja contaminado.</p>

      <div class="vitrine" aria-hidden="true">
        <div class="vitrine-itens" data-vitrine></div>
        <div class="vitrine-lona"></div>
      </div>

      <nav class="inicial-botoes" aria-label="Menu">
        <button type="button" class="botao botao-principal botao-grande" data-acao="jogar">Jogar</button>
        <button type="button" class="botao botao-grande" data-acao="comoJogar">Como jogar</button>
        <button type="button" class="botao botao-grande" data-acao="creditos">Créditos</button>
      </nav>
    </div>
    <p class="inicial-rodape">${R.util.esc(rodape)}</p>
  `, aoMostrar);

  // Os itens da faixa de enfeite. A lista é repetida para o movimento
  // poder recomeçar sem dar um "pulo".
  const vitrine = tela.querySelector('[data-vitrine]');
  const itens = (R.dados.itens || []).slice(0, 8);
  const desenhos = itens.map((item) => R.dom.imagem(item.imagem, '', 'vitrine-item')).join('');
  vitrine.innerHTML = '<div class="vitrine-grupo">' + desenhos + '</div><div class="vitrine-grupo">' + desenhos + '</div>';

  function aoMostrar() {
    // Só mostra os botões das telas que existem no projeto.
    tela.querySelector('[data-acao="comoJogar"]').hidden = !R.telas.existe('como-jogar');
    tela.querySelector('[data-acao="creditos"]').hidden = !R.telas.existe('creditos');
  }

  R.dom.acoes(tela, {
    jogar() { R.fluxo.escolherFase(); },
    comoJogar() { R.telas.mostrar('como-jogar'); },
    creditos() { R.telas.mostrar('creditos'); }
  });
})(window.Reciclando);
