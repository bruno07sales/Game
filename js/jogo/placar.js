/* ==========================================================================
   RECICLANDO — js/jogo/placar.js                  (GDD, seções 8, 9 e 21)
   A parte de cima da tela de jogo: fase, pontos, medidor de contaminação
   e quantos itens já passaram.

   Este arquivo só MOSTRA os números. Quem calcula é js/regras/:
     pontos ......... pontuacao.js
     contaminação ... contaminacao.js
   O medidor é dividido em partes, uma para cada erro possível (5 partes
   com 20% por erro). Assim ele não depende só de cor: dá para contar.
   ========================================================================== */
(function (R) {
  'use strict';

  const area = R.telaJogo.area('placar');
  const campos = {};

  /* ---- Começo de fase: monta o placar ---- */
  R.eventos.ouvir('fase-iniciada', (dados) => {
    const esc = R.util.esc;
    const partes = R.contaminacao ? R.contaminacao.partes() : 0;

    area.innerHTML = `
      <div class="placar-bloco placar-fase">
        <span class="placar-rotulo">Fase ${dados.indice + 1}</span>
        <strong class="placar-valor">${esc(dados.fase.nome)}</strong>
      </div>

      ${R.pontuacao ? `
      <div class="placar-bloco placar-pontos">
        <span class="placar-rotulo">Pontos</span>
        <strong class="placar-valor" data-campo="pontos">0</strong>
      </div>` : ''}

      ${R.contaminacao ? `
      <div class="placar-bloco medidor" data-campo="medidor">
        <div class="medidor-topo">
          <span class="placar-rotulo">Contaminação do lote</span>
          <span class="medidor-nivel" data-campo="nivel"></span>
        </div>
        <div class="medidor-linha">
          <div class="medidor-barra" data-campo="barra" role="img">
            ${'<span class="medidor-parte"></span>'.repeat(partes)}
          </div>
          <strong class="placar-valor" data-campo="contaminacao">0%</strong>
        </div>
      </div>` : ''}

      <div class="placar-bloco placar-itens">
        <span class="placar-rotulo">Itens</span>
        <strong class="placar-valor"><span data-campo="passaram">0</span> de <span data-campo="total">0</span></strong>
      </div>`;

    area.querySelectorAll('[data-campo]').forEach((elemento) => {
      campos[elemento.dataset.campo] = elemento;
    });
    Object.keys(campos).forEach((nome) => {
      if (!area.contains(campos[nome])) delete campos[nome];
    });
  });

  /* ---- Sempre que um número muda ---- */
  R.eventos.ouvir('estado-mudou', (estado) => {
    escrever('passaram', estado.passaram);
    escrever('total', estado.total);
    escrever('pontos', R.util.numero(estado.pontos));

    if (campos.medidor) {
      const valor = estado.contaminacao;
      const nivel = R.contaminacao.nivel(valor);
      const cheias = Math.round(valor / R.dados.config.contaminacao.porErro);

      escrever('contaminacao', valor + '%');
      escrever('nivel', nivel);
      campos.barra.setAttribute('aria-label', 'Contaminação do lote: ' + valor + '%. ' + nivel + '.');
      campos.barra.querySelectorAll('.medidor-parte').forEach((parte, posicao) => {
        parte.classList.toggle('cheia', posicao < cheias);
      });
      // O CSS usa estes números para mudar o visual conforme o lote piora.
      campos.medidor.dataset.cheias = cheias;
      campos.medidor.dataset.restam = R.contaminacao.errosRestantes();
    }
  });

  // Escreve no campo e dá um "pulinho" quando o valor muda.
  function escrever(nome, valor) {
    const campo = campos[nome];
    if (!campo) return;
    const texto = String(valor);
    if (campo.textContent === texto) return;
    campo.textContent = texto;
    campo.classList.remove('mudou');
    void campo.offsetWidth;
    campo.classList.add('mudou');
  }
})(window.Reciclando);
