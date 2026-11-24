/* ==========================================================================
   RECICLANDO — js/telas/abertura.js               (GDD, seção 2.2)
   O painel que aparece antes de cada fase: onde o jogador está, quais são
   as lixeiras e no que prestar atenção.

   O GDD diz que as regras são "apresentadas ao jogador antes do início de
   cada fase". É esta tela que faz isso. Os textos ficam no campo
   "abertura" de cada arquivo de dados/fases/.
   ========================================================================== */
(function (R) {
  'use strict';

  let indiceAtual = 0;

  const tela = R.telas.criar('abertura', '<div class="abertura-painel" data-painel></div>', aoMostrar);

  function aoMostrar(indice) {
    const dados = {fase: R.dados.fases[indice], indice};
    const esc = R.util.esc;
    const fase = dados.fase;
    const config = R.dados.config;
    const abertura = fase.abertura || {};
    indiceAtual = dados.indice;

    const errosParaPerder = Math.ceil(config.contaminacao.limite / config.contaminacao.porErro);

    const lixeiras = fase.lixeiras.map((id) => {
      const lixeira = R.lixeira(id);
      return `
        <li class="abertura-lixeira">
          ${R.dom.imagem(lixeira.imagem, '', 'abertura-figura')}
          <span>${esc(lixeira.nome)}</span>
        </li>`;
    }).join('');

    const painel = tela.querySelector('[data-painel]');
    painel.style.setProperty('--cor-da-cena', fase.cor || '');
    painel.innerHTML = `
      <div class="abertura-topo">
        <p class="abertura-numero">Fase ${dados.indice + 1} de ${R.dados.fases.length}</p>
        <h1 data-foco tabindex="-1">${esc(fase.nome)}</h1>
        <p class="abertura-ambiente">${esc(fase.ambiente || '')}</p>
      </div>

      <div class="abertura-corpo">
        <p class="abertura-resumo">${esc(abertura.resumo || '')}</p>
        ${abertura.novidade ? `
        <p class="abertura-novidade">
          <strong>Fique de olho.</strong> ${esc(abertura.novidade)}
        </p>` : ''}

        <h2>Lixeiras desta fase</h2>
        <ul class="abertura-lixeiras" data-quantidade="${fase.lixeiras.length}">${lixeiras}</ul>

        <p class="abertura-numeros">
          Passam <strong>${fase.quantidadeDeItens} itens</strong>.
          No ${errosParaPerder}º erro, o lote é perdido.
        </p>

        <div class="abertura-botoes">
          <button type="button" class="botao" data-acao="voltar">Voltar</button>
          <button type="button" class="botao botao-principal botao-grande" data-acao="comecar">Começar</button>
        </div>
      </div>`;
  }

  R.dom.acoes(tela, {
    voltar() { R.fluxo.escolherFase(); },
    comecar() { R.telas.mostrar('jogo'); R.partida.iniciar(indiceAtual); }
  });
})(window.Reciclando);
