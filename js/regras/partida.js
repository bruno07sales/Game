// Regras independentes da interface: entrada, movimento e descarte.
(function (R) {
  'use strict';
  R.criarPartida = function (dados, aleatorio = Math.random) {
    let fila, proximo, espera, numero;
    const estado = { itens: [], passaram: 0, terminou: false };
    function reiniciar() {
      fila = R.sortearFila(dados.itens, dados.esteira.quantidade, aleatorio);
      proximo = 0; espera = dados.esteira.esperaInicial; numero = 0;
      estado.itens = []; estado.passaram = 0; estado.terminou = false;
    }
    function retirar(lixeira) {
      const entrada = estado.itens.shift();
      estado.passaram++;
      estado.terminou = estado.passaram === fila.length;
      return { item: entrada.item, caiu: lixeira === null, acertou: entrada.item.lixeira === lixeira };
    }
    function atualizar(dt) {
      const quedas = [];
      if (estado.terminou || !Number.isFinite(dt) || dt <= 0) return quedas;
      const epsilon = 1e-9;
      while (dt > epsilon && !estado.terminou) {
        const ateEntrada = proximo < fila.length ? Math.max(0, espera) : Infinity;
        const ateQueda = estado.itens.length
          ? Math.max(0, (1 - estado.itens[0].progresso) * dados.esteira.travessia) : Infinity;
        const passo = Math.min(dt, ateEntrada, ateQueda);
        dt -= passo; espera -= passo;
        estado.itens.forEach(e => { e.progresso += passo / dados.esteira.travessia; });
        while (estado.itens.length && estado.itens[0].progresso >= 1 - epsilon) quedas.push(retirar(null));
        if (espera <= epsilon && proximo < fila.length) {
          estado.itens.push({ numero: ++numero, item: fila[proximo++], progresso: 0 });
          espera += dados.esteira.intervalo;
        }
      }
      return quedas;
    }
    function descartar(id) {
      if (estado.terminou || !estado.itens.length || !dados.lixeiras.some(x => x.id === id)) return null;
      return retirar(id);
    }
    reiniciar();
    return { estado, reiniciar, atualizar, descartar };
  };
})(window.Reciclando);
