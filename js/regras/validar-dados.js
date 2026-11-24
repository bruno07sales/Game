(function (R) {
  R.validarDados = function () {
    for (const fase of R.dados.fases) {
      if (!Number.isInteger(fase.quantidadeDeItens) || fase.quantidadeDeItens < 1) throw new Error('Quantidade inválida: ' + fase.id);
      for (const id of fase.lixeiras) if (!R.lixeira(id)) throw new Error('Lixeira ausente: ' + id);
      for (const id of fase.itens) {
        const item = R.item(id);
        if (!item || !fase.lixeiras.includes(item.lixeira)) throw new Error('Destino inválido: ' + id);
      }
    }
  };
})(window.Reciclando);
