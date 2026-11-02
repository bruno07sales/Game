// Apresenta todos os tipos antes de repetir o conjunto.
(function (R) {
  'use strict';
  R.sortearFila = function (itens, quantidade, aleatorio = Math.random) {
    if (!itens.length || !Number.isInteger(quantidade) || quantidade < 1) throw new Error('Fila inválida.');
    const fila = [];
    while (fila.length < quantidade) {
      const bloco = itens.slice();
      for (let i = bloco.length - 1; i > 0; i--) {
        const j = Math.floor(aleatorio() * (i + 1));
        [bloco[i], bloco[j]] = [bloco[j], bloco[i]];
      }
      fila.push(...bloco);
    }
    return fila.slice(0, quantidade);
  };
})(window.Reciclando);
