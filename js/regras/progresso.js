(function (R) {
  const resultados = new Map();
  let liberada = 0;
  R.progresso = {
    podeJogar: indice => Number.isInteger(indice) && indice >= 0 && indice < R.dados.fases.length && indice <= liberada,
    modoDeTeste: false,
    estaDisponivel: indice => Number.isInteger(indice) && indice >= 0 && indice < R.dados.fases.length,
    estaLiberada(indice) { return this.podeJogar(indice); },
    resultadoDa: fase => resultados.get(R.dados.fases.indexOf(fase)) || null,
    liberarTodas() { liberada = R.dados.fases.length - 1; this.modoDeTeste = true; },
    liberarTudo() { this.liberarTodas(); },
    total() { return {fasesConcluidas: resultados.size, pontos: Array.from(resultados.values()).reduce((s, r) => s + r.pontos, 0)}; }
  };
  R.eventos.ouvir('fase-terminada', resultado => {
    if (resultado.venceu) {
      liberada = Math.max(liberada, resultado.indiceDaFase + 1);
      if (!resultados.has(resultado.indiceDaFase) || resultados.get(resultado.indiceDaFase).pontos < resultado.pontos)
        resultados.set(resultado.indiceDaFase, resultado);
    }
  });
})(window.Reciclando);
