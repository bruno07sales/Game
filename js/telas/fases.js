/* ==========================================================================
   RECICLANDO — js/telas/fases.js                  (GDD, seções 13 e 22.2)
   A tela de escolha da fase respeita as fases disponíveis nesta versão.

   ATALHO DE TESTE: clicar 5 vezes seguidas no título "Escolha a fase"
   libera todas as fases. Serve para testar e para apresentar o jogo sem
   precisar vencer as fases anteriores. A quantidade de cliques e o
   liga/desliga ficam em dados/config.js.
   ========================================================================== */
(function (R) {
  'use strict';

  const tela = R.telas.criar('fases', `
    <div class="pagina">
      <header class="pagina-topo">
        <button type="button" class="botao botao-pequeno" data-acao="voltar">Voltar</button>
        <h1 data-foco tabindex="-1" data-acao="atalho">Escolha a fase</h1>
      </header>
      <ol class="fases-lista" data-lista></ol>
      <p class="fases-total" data-total></p>
      <p class="aviso" data-teste hidden>Modo de teste: todas as fases estão liberadas.</p>
    </div>
  `, desenhar);

  function desenhar() {
    const esc = R.util.esc;
    const progresso = R.progresso;

    tela.querySelector('[data-lista]').innerHTML = R.dados.fases.map((fase, indice) => {
      const liberada = !progresso || progresso.estaLiberada(indice);
      const disponivel = !progresso || progresso.estaDisponivel(indice);
      const resultado = progresso ? progresso.resultadoDa(fase) : null;

      let situacao = 'Disponível';
      if (!liberada) situacao = 'Bloqueada: conclua a fase ' + indice;
      if (!disponivel) situacao = 'Indisponível nesta versão';
      if (resultado) situacao = 'Concluída: ' + R.util.numero(resultado.pontos) + ' pontos';

      return `
        <li>
          <button type="button" class="fase-cartao ${resultado ? 'fase-concluida' : ''}" data-acao="escolher" data-indice="${indice}"
                  style="--cor-da-cena: ${esc(fase.cor || '')}" ${liberada ? '' : 'disabled'}>
            <span class="fase-numero">${liberada ? indice + 1 : R.icone('cadeado')}</span>
            <span class="fase-nome">${esc(fase.nome)}</span>
            <span class="fase-ambiente">${esc(fase.ambiente || '')}</span>
            <span class="fase-dados">${fase.lixeiras.length} lixeiras, ${fase.quantidadeDeItens} itens</span>
            <span class="fase-situacao">${resultado ? R.icone('certo') : ''}${esc(situacao)}</span>
          </button>
        </li>`;
    }).join('');

    const total = progresso ? progresso.total() : null;
    const linhaDoTotal = tela.querySelector('[data-total]');
    linhaDoTotal.hidden = !total || total.fasesConcluidas === 0;
    if (total) linhaDoTotal.textContent = 'Total da jornada: ' + R.util.numero(total.pontos) + ' pontos';

    tela.querySelector('[data-teste]').hidden = !(progresso && progresso.modoDeTeste);
    tela.querySelector('[data-acao="voltar"]').hidden = !R.telas.existe('inicial');
  }

  /* ---- Atalho de teste ---- */
  let cliques = 0;
  let relogio = null;

  function atalho() {
    const regra = R.dados.config.atalhoDeTeste;
    if (!regra || !regra.ativo || !R.progresso) return;
    cliques++;
    clearTimeout(relogio);
    relogio = setTimeout(() => { cliques = 0; }, 1500); // os cliques têm de ser seguidos
    if (cliques >= regra.cliques) {
      cliques = 0;
      R.progresso.liberarTudo();
      desenhar();
    }
  }

  R.dom.acoes(tela, {
    voltar() { R.fluxo.inicio(); },
    escolher(evento, botao) { R.fluxo.jogar(Number(botao.dataset.indice)); },
    atalho: atalho
  });
})(window.Reciclando);
