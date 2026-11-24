// Regras independentes da interface: entrada, movimento e descarte.
(function (R) {
  'use strict';
  R.criarPartida = function (dados, aleatorio = Math.random) {
    const tempos = dados.esteira;
    if (!Number.isFinite(tempos.travessia) || tempos.travessia <= 0 ||
        !Number.isFinite(tempos.intervalo) || tempos.intervalo <= 0 ||
        !Number.isFinite(tempos.esperaInicial) || tempos.esperaInicial < 0) {
      throw new Error('Tempos da esteira inválidos.');
    }
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
      const folga = entrada.item.lixeira === lixeira ? tempos.folgaDepoisDoAcerto : tempos.folgaDepoisDoErro;
      if (!estado.itens.length && tempos.adiantarComEsteiraVazia && Number.isFinite(folga)) espera = Math.min(espera, folga);
      return { entrada, item: entrada.item, caiu: lixeira === null, acertou: entrada.item.lixeira === lixeira };
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

(function (R) {
  'use strict';
  const estado = {naEsteira: [], terminou: true, pausada: false};
  let motor, indice, erros, ultimoDescarte, ultimaLixeira;
  function sincronizar() {
    estado.naEsteira = motor.estado.itens;
    estado.passaram = motor.estado.passaram;
  }
  function finalizar() {
    if (estado.terminou) return;
    estado.terminou = true;
    const resultado = {fase: estado.fase, indiceDaFase: indice, pontos: estado.pontos,
      contaminacao: estado.contaminacao, total: estado.total, acertos: estado.acertos,
      erros: estado.erros, errosPorItem: Array.from(erros.values()), venceu: !estado.lotePerdido};
    R.eventos.emitir('fase-terminada', resultado);
  }
  function registrar(jogada) {
    if (!jogada || estado.terminou) return;
    sincronizar();
    jogada.lixeiraCerta = R.lixeira(jogada.item.lixeira);
    jogada.lixeiraEscolhida = jogada.caiu ? null : R.lixeira(ultimaLixeira);
    if (jogada.acertou) estado.acertos++;
    else {
      estado.erros++;
      const erro = erros.get(jogada.item.id) || {item: jogada.item, vezes: 0};
      erro.vezes++; erro.lixeira = jogada.lixeiraEscolhida; erros.set(jogada.item.id, erro);
    }
    R.eventos.emitir(jogada.acertou ? 'acerto' : 'erro', jogada);
    R.eventos.emitir('estado-mudou', estado);
    if (estado.lotePerdido || motor.estado.terminou) finalizar();
  }
  R.partida = {
    estado,
    lixeiraCerta(item) { return item.lixeira; },
    iniciar(i) {
      indice = i;
      const fase = R.dados.fases[i];
      motor = R.criarPartida({itens: fase.itens.map(R.item), lixeiras: fase.lixeiras.map(R.lixeira),
        esteira: {...R.dados.config.esteira, ...fase.esteira, quantidade: fase.quantidadeDeItens, esperaInicial: R.dados.config.esteira.esperaInicial}});
      Object.assign(estado, {fase, terminou: false, pausada: false, pontos: 0, contaminacao: 0,
        lotePerdido: false, acertos: 0, erros: 0, total: fase.quantidadeDeItens});
      erros = new Map(); ultimoDescarte = -Infinity; ultimaLixeira = null;
      sincronizar();
      R.eventos.emitir('fase-iniciada', {fase, indice: i});
      R.eventos.emitir('estado-mudou', estado);
    },
    atualizar(dt) {
      if (!motor || estado.terminou || estado.pausada || !Number.isFinite(dt) || dt <= 0) return;
      const anteriores = new Set(estado.naEsteira.map(e => e.numero));
      const quedas = motor.atualizar(dt);
      sincronizar();
      estado.naEsteira.forEach(e => { if (!anteriores.has(e.numero)) R.eventos.emitir('item-entrou', e); });
      quedas.forEach(registrar);
    },
    descartar(id) {
      if (!motor || estado.terminou || estado.pausada || document.hidden) return;
      const agora = performance.now();
      if (id === ultimaLixeira && agora - ultimoDescarte < R.dados.config.esteira.pausaEntreCliques * 1000) return;
      const jogada = motor.descartar(id);
      if (jogada) { ultimaLixeira = id; ultimoDescarte = agora; registrar(jogada); }
    }
  };
})(window.Reciclando);
