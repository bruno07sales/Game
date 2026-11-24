(function (R) {
  const tela = R.telaJogo.elemento;
  const painel = tela.querySelector('[data-pausa]');
  function pausar(valor) {
    if (R.telas.atual !== 'jogo' || R.partida.estado.terminou) return;
    R.partida.estado.pausada = valor; painel.hidden = !valor;
    if (valor) tela.querySelector('[data-titulo-pausa]').focus();
    else tela.querySelector('[data-acao="pausar"]').focus();
  }
  R.dom.acoes(tela, {
    pausar() { pausar(true); }, retomar() { pausar(false); },
    reiniciar() { painel.hidden = true; R.fluxo.jogar(R.dados.fases.indexOf(R.partida.estado.fase)); },
    sair() { painel.hidden = true; R.fluxo.escolherFase(); }
  });
  R.eventos.ouvir('fase-iniciada', () => { painel.hidden = true; });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { pausar(!R.partida.estado.pausada); }
    if (e.key === 'Tab' && !painel.hidden) {
      const botoes = painel.querySelectorAll('button');
      if (e.shiftKey && (document.activeElement === botoes[0] || document.activeElement === tela.querySelector('[data-titulo-pausa]'))) { e.preventDefault(); botoes[botoes.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === botoes[botoes.length - 1]) { e.preventDefault(); botoes[0].focus(); }
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pausar(true); });
})(window.Reciclando);
