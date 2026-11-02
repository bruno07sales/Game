// Somente Casa é jogável nesta etapa. Catálogos futuros permanecem intactos.
(function (R) {
  'use strict';
  const fase = R.dados.fases.find(f => f.id === 'casa');
  const selecionar = (ids, catalogo) => ids.map(id => {
    const dado = catalogo.find(x => x.id === id);
    if (!dado) throw new Error('Dado ausente: ' + id);
    return dado;
  });
  const dados = {
    itens: selecionar(fase.itens, R.dados.itens),
    lixeiras: selecionar(fase.lixeiras, R.dados.lixeiras),
    esteira: { ...fase.esteira, quantidade: fase.quantidadeDeItens,
      esperaInicial: R.dados.config.esteira.esperaInicial }
  };
  R.iniciarInterface(dados);
})(window.Reciclando);
