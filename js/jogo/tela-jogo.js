(function (R) {
  const elemento = R.telas.criar('jogo', `
    <header class="jogo-topo"><button type="button" class="botao-redondo" data-acao="pausar" aria-label="Pausar o jogo" title="Pausar (Esc)">${R.icone('pausa')}</button><div class="placar" data-area="placar"></div></header>
    <div class="cena" data-area="cena"><div class="esteira" data-area="esteira"></div></div>
    <div class="retorno" data-area="retorno" role="status"></div>
    <div class="lixeiras" data-area="lixeiras"></div>
    <div class="painel-fundo" data-pausa hidden><div class="painel" role="dialog" aria-modal="true" aria-label="Jogo pausado">
      <h2 tabindex="-1" data-titulo-pausa>Jogo pausado</h2><p>A esteira está parada. Nada é perdido enquanto o jogo está em pausa.</p><div class="painel-botoes">
      <button type="button" class="botao" data-acao="retomar">Retomar</button>
      <button type="button" class="botao" data-acao="reiniciar">Reiniciar</button>
      <button type="button" class="botao" data-acao="sair">Escolher fase</button></div></div></div>`);
  R.telaJogo = {elemento, area: nome => elemento.querySelector('[data-area="' + nome + '"]')};
})(window.Reciclando);
