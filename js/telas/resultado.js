/* ==========================================================================
   RECICLANDO — js/telas/resultado.js              (GDD, seções 19 e 22.5)
   O fim de uma fase, nos dois casos:

     VITÓRIA .. pontuação, acertos, erros e contaminação, com o botão
                "Próxima fase". Aparece depois dos cards.
     DERROTA .. "O lote foi contaminado", a lista do que foi descartado
                errado e o botão "Tentar novamente". Na derrota não há
                cards e os pontos da tentativa não contam.
   ========================================================================== */
(function (R) {
  'use strict';

  const tela = R.telas.criar('resultado', '<div class="resultado-painel" data-painel></div>', aoMostrar);
  let resultadoAtual = null;

  function aoMostrar(resultado) {
    resultadoAtual = resultado;
    const painel = tela.querySelector('[data-painel]');
    painel.className = 'resultado-painel ' + (resultado.venceu ? 'resultado-vitoria' : 'resultado-derrota');
    painel.innerHTML = resultado.venceu ? vitoria(resultado) : derrota(resultado);
  }

  function vitoria(resultado) {
    const esc = R.util.esc;
    const nivel = R.contaminacao ? R.contaminacao.nivel(resultado.contaminacao) : '';
    const total = R.progresso ? R.progresso.total() : null;

    let seguinte = 'Escolher fase';
    if (R.fluxo.temProxima(resultado)) {
      seguinte = 'Próxima fase: ' + R.dados.fases[resultado.indiceDaFase + 1].nome;
    } else if (R.telas.existe('final')) {
      seguinte = 'Ver o resultado final';
    }

    return `
      <p class="resultado-fase">Fase ${resultado.indiceDaFase + 1}: ${esc(resultado.fase.nome)}</p>
      <h1 data-foco tabindex="-1">Fase concluída</h1>

      <dl class="numeros">
        <div><dt>Pontos</dt><dd>${R.util.numero(resultado.pontos)}</dd></div>
        <div><dt>Acertos</dt><dd>${resultado.acertos} de ${resultado.total}</dd></div>
        <div><dt>Erros</dt><dd>${resultado.erros}</dd></div>
        <div><dt>Contaminação</dt><dd>${resultado.contaminacao}%</dd><dd class="numeros-nota">${esc(nivel)}</dd></div>
      </dl>

      ${total ? '<p class="resultado-total">Total da jornada: <strong>' + R.util.numero(total.pontos) + ' pontos</strong></p>' : ''}

      <div class="resultado-botoes">
        <button type="button" class="botao botao-principal botao-grande" data-acao="seguir">${esc(seguinte)}</button>
        <button type="button" class="botao" data-acao="repetir">Jogar esta fase de novo</button>
        ${R.telas.existe('fases') && seguinte !== 'Escolher fase'
          ? '<button type="button" class="botao" data-acao="fases">Escolher fase</button>' : ''}
      </div>`;
  }

  function derrota(resultado) {
    const esc = R.util.esc;
    const limite = R.dados.config.contaminacao.limite;

    const erros = resultado.errosPorItem.map((erro) => {
      const certa = R.lixeira(R.partida.lixeiraCerta(erro.item, resultado.fase));
      const onde = erro.lixeira ? 'você colocou em ' + erro.lixeira.nome : 'caiu da esteira';
      const vezes = erro.vezes > 1 ? ', ' + erro.vezes + ' vezes' : '';
      return `
        <li>
          ${R.dom.imagem(erro.item.imagem, '', 'erros-figura')}
          <span><strong>${esc(erro.item.nome)}</strong> vai em <strong>${esc(certa.nome)}</strong>
          <span class="erros-detalhe">(${esc(onde + vezes)})</span></span>
        </li>`;
    }).join('');

    return `
      <p class="resultado-fase">Fase ${resultado.indiceDaFase + 1}: ${esc(resultado.fase.nome)}</p>
      <h1 data-foco tabindex="-1">O lote foi contaminado</h1>
      <p class="resultado-texto">
        A contaminação chegou a ${limite}% depois de ${resultado.erros} ${resultado.erros === 1 ? 'erro' : 'erros'}.
        Os pontos desta tentativa não contam.
      </p>

      <h2>O que deu errado</h2>
      <ul class="erros-lista">${erros}</ul>

      <div class="resultado-botoes">
        <button type="button" class="botao botao-principal botao-grande" data-acao="repetir">Tentar novamente</button>
        ${R.telas.existe('fases') ? '<button type="button" class="botao" data-acao="fases">Escolher fase</button>' : ''}
      </div>`;
  }

  R.dom.acoes(tela, {
    seguir() { R.fluxo.seguir(resultadoAtual); },
    repetir() { R.fluxo.jogar(resultadoAtual.indiceDaFase); },
    fases() { R.fluxo.escolherFase(); }
  });
})(window.Reciclando);
