(function (R) {
  'use strict';
  R.validarDados();
  R.fluxo = {
    inicio() { R.telas.mostrar('inicial'); },
    escolherFase() { R.partida.estado.pausada = true; R.telas.mostrar('fases'); },
    jogar(indice) { if (R.progresso.podeJogar(indice)) R.telas.mostrar('abertura', indice); },
    resultado(resultado) { R.telas.mostrar('resultado', resultado); },
    temProxima(resultado) { return resultado.indiceDaFase + 1 < R.dados.fases.length; },
    seguir(resultado) { if (this.temProxima(resultado)) this.jogar(resultado.indiceDaFase + 1); else this.escolherFase(); }
  };
  let pendente = null, espera = 0;
  R.eventos.ouvir('fase-terminada', resultado => { pendente = resultado; espera = R.dados.config.esteira.esperaNoFim; });
  R.eventos.ouvir('fase-iniciada', () => { pendente = null; });
  let ultimo = performance.now();
  document.addEventListener('visibilitychange', () => { ultimo = performance.now(); });
  function quadro(agora) {
    const dt = Math.max(0, Math.min((agora - ultimo) / 1000, 0.1)); ultimo = agora;
    if (!document.hidden && R.telas.atual === 'jogo') {
      if (pendente) {
        espera -= dt;
        if (espera <= 0) { const resultado = pendente; pendente = null; R.telas.mostrar(resultado.venceu ? 'cards' : 'resultado', resultado); }
      } else R.partida.atualizar(dt);
      R.eventos.emitir('quadro', dt);
    }
    requestAnimationFrame(quadro);
  }
  R.fluxo.inicio(); requestAnimationFrame(quadro);
})(window.Reciclando);
