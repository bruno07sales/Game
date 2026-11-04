(function (R) {
  'use strict';

  const estado = R.partida.estado;

  R.eventos.ouvir('acerto', (jogada) => {
    const ganho = R.dados.config.pontos.acerto;
    estado.pontos += ganho;
    jogada.pontos = ganho;
  });

  R.eventos.ouvir('erro', (jogada) => {
    const antes = estado.pontos;
    estado.pontos = Math.max(0, antes - R.dados.config.pontos.erro);
    jogada.pontos = estado.pontos - antes; // negativo, ou zero se já estava em zero
  });

  // Serve para as telas saberem que o jogo tem pontuação.
  R.pontuacao = { ativa: true };
})(window.Reciclando);
