/* ==========================================================================
   RECICLANDO — js/telas/creditos.js               (GDD, seção 22.1)
   A tela "Créditos". Os textos ficam em dados/creditos.js.
   ========================================================================== */
(function (R) {
  'use strict';

  const esc = R.util.esc;
  const c = R.dados.creditos || {};
  const lista = (itens) => (itens || []).map((texto) => '<li>' + esc(texto) + '</li>').join('');

  const tela = R.telas.criar('creditos', `
    <div class="pagina pagina-estreita">
      <header class="pagina-topo">
        <button type="button" class="botao botao-pequeno" data-acao="voltar">Voltar</button>
        <h1 data-foco tabindex="-1">Créditos</h1>
      </header>

      <div class="creditos-painel">
      <p class="creditos-descricao">${esc(c.descricao)}</p>

      <h2>Equipe</h2>
      <ul class="creditos-lista">${lista(c.equipe)}</ul>

      <h2>Disciplina</h2>
      <ul class="creditos-lista">
        ${lista([c.disciplina, c.curso, [c.instituicao, c.semestre].filter(Boolean).join(', ')].filter(Boolean))}
        ${c.professora ? '<li>Professora: ' + esc(c.professora) + '</li>' : ''}
      </ul>

      <h2>Como o jogo foi feito</h2>
      <ul class="creditos-lista">${lista(c.recursos)}</ul>

      <h2>Referências</h2>
      <ul class="creditos-lista">${lista(c.referencias)}</ul>

      <p class="aviso">${esc(c.aviso)}</p>
      </div>
    </div>
  `);

  R.dom.acoes(tela, {
    voltar() { R.fluxo.inicio(); }
  });
})(window.Reciclando);
