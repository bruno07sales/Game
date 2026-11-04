(function (R) {
  'use strict';

  const estado = R.partida.estado;

  R.eventos.ouvir('erro', () => {
    const regra = R.dados.config.contaminacao;
    estado.contaminacao = Math.min(regra.limite, estado.contaminacao + regra.porErro);
    // partida.js confere esta marca logo depois do erro e encerra a fase.
    if (estado.contaminacao >= regra.limite) estado.lotePerdido = true;
  });

  R.contaminacao = {
    // Texto do medidor para um valor: 40 -> "Contaminação moderada".
    nivel(valor) {
      let texto = '';
      R.dados.config.contaminacao.niveis.forEach((nivel) => {
        if (valor >= nivel.aPartirDe) texto = nivel.texto;
      });
      return texto;
    },

    // Em quantas partes o medidor é dividido (uma por erro possível).
    partes() {
      const regra = R.dados.config.contaminacao;
      return Math.max(1, Math.ceil(regra.limite / regra.porErro));
    },

    // Quantos erros ainda cabem antes de perder o lote.
    errosRestantes() {
      const regra = R.dados.config.contaminacao;
      return Math.max(0, Math.ceil((regra.limite - estado.contaminacao) / regra.porErro));
    }
  };
})(window.Reciclando);
