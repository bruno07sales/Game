/* ==========================================================================
   RECICLANDO — js/telas/como-jogar.js             (GDD, seção 22.3)
   A tela "Como jogar": os passos do jogo e a tabela com a regra de cada
   lixeira e exemplos de itens.

   A tabela é montada a partir dos dados (dados/lixeiras.js e dados/itens.js)
   e os números vêm de dados/config.js. Se os dados mudarem, esta tela muda
   junto, sem precisar reescrever o texto.
   ========================================================================== */
(function (R) {
  'use strict';

  const tela = R.telas.criar('como-jogar', `
    <div class="pagina">
      <header class="pagina-topo">
        <button type="button" class="botao botao-pequeno" data-acao="voltar">Voltar</button>
        <h1 data-foco tabindex="-1">Como jogar</h1>
      </header>
      <div data-conteudo></div>
    </div>
  `, aoMostrar);

  function aoMostrar() {
    const esc = R.util.esc;
    const config = R.dados.config;
    const cards = config.cards.porFase;

    // Lixeiras e itens que aparecem em pelo menos uma fase, na ordem em que entram no jogo.
    const idsDasLixeiras = [];
    const idsDosItens = [];
    R.dados.fases.forEach((fase) => {
      fase.lixeiras.forEach((id) => { if (idsDasLixeiras.indexOf(id) === -1) idsDasLixeiras.push(id); });
      fase.itens.forEach((id) => { if (idsDosItens.indexOf(id) === -1) idsDosItens.push(id); });
    });

    // Um item é exemplo de uma lixeira se, em alguma fase, o lugar certo dele é ela.
    const vaiPara = (item, idDaLixeira) => R.dados.fases.some((fase) =>
      fase.itens.indexOf(item.id) !== -1 && R.partida.lixeiraCerta(item, fase) === idDaLixeira);

    const linhas = idsDasLixeiras.map((id) => {
      const lixeira = R.lixeira(id);
      const exemplos = idsDosItens
        .map((idItem) => R.item(idItem))
        .filter((item) => vaiPara(item, id))
        .map((item) => item.nome.charAt(0).toLowerCase() + item.nome.slice(1))
        .join(', ');
      return `
        <tr>
          <th scope="row">
            ${R.dom.imagem(lixeira.imagem, '', 'tabela-figura')}
            <span>${esc(lixeira.nome)}</span>
          </th>
          <td>${esc(lixeira.regra)}</td>
          <td>${esc(exemplos)}</td>
        </tr>`;
    }).join('');

    tela.querySelector('[data-conteudo]').innerHTML = `
      <ol class="passos">
        <li>
          <strong>Olhe o item da vez.</strong>
          Os resíduos chegam pela esteira. O item da vez é o que está mais perto do fim, marcado com uma seta.
        </li>
        <li>
          <strong>Clique na lixeira certa.</strong>
          Não basta olhar o material. Olhe também o estado: limpo, sujo, quebrado, molhado ou com líquido.
        </li>
        <li>
          <strong>Não contamine o lote.</strong>
          Cada erro contamina o lote em ${config.contaminacao.porErro}%, e deixar o item cair da esteira também é erro.
          Com ${config.contaminacao.limite}%, o lote é perdido e a fase recomeça.
        </li>
        <li>
          <strong>Leia os cards.</strong>
          No fim de cada fase, ${cards} cards explicam os itens, começando pelos que você errou.
        </li>
      </ol>

      <p class="regra-pontos">
        Cada acerto vale <strong>${config.pontos.acerto} pontos</strong>.
        Cada erro tira <strong>${config.pontos.erro} pontos</strong>.
      </p>

      <h2>O que vai em cada lixeira</h2>
      <div class="tabela-rolagem">
        <table class="tabela">
          <thead>
            <tr><th scope="col">Lixeira</th><th scope="col">O que vai nela</th><th scope="col">Exemplos do jogo</th></tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>

      <p class="aviso">${esc((R.dados.creditos || {}).aviso || '')}</p>`;
  }

  R.dom.acoes(tela, {
    voltar() { R.fluxo.inicio(); }
  });
})(window.Reciclando);
