(function (R) {
  'use strict';

  const fases = R.dados.fases;
  const existe = (nome) => R.telas.existe(nome);
  const mostrar = (nome, dados) => R.telas.mostrar(nome, dados);

  R.fluxo = {

    // Abre o jogo: confere os dados e mostra a primeira tela.
    abrir() {
      if (R.validarDados) {
        const conferencia = R.validarDados();
        conferencia.avisos.forEach((aviso) => console.warn('[Reciclando] ' + aviso));
        if (conferencia.problemas.length) {
          mostrarProblemas(conferencia.problemas);
          return;
        }
      }
      this.inicio();
    },

    // Tela inicial.
    inicio() {
      if (existe('inicial')) mostrar('inicial');
      else this.escolherFase();
    },

    // Tela de escolha da fase.
    escolherFase() {
      if (existe('fases')) mostrar('fases');
      else this.comecar(0);
    },

    // Começa uma fase pelo painel de abertura. "indice" 0 é a primeira fase.
    comecar(indice) {
      if (existe('abertura')) mostrar('abertura', { fase: fases[indice], indice: indice });
      else this.jogar(indice);
    },

    // Vai direto para a esteira (usado também em "Tentar novamente").
    jogar(indice) {
      mostrar('jogo', { fase: fases[indice], indice: indice });
    },

    // O jogador saiu da fase pelo menu de pausa.
    sairDaFase() {
      if (existe('fases')) mostrar('fases');
      else this.inicio();
    },

    // Tela de resultado (vitória) ou de lote contaminado (derrota).
    resultado(resultado) {
      if (existe('resultado')) mostrar('resultado', resultado);
      else if (resultado.venceu) this.seguir(resultado);
      else this.jogar(resultado.indiceDaFase);
    },

    // Existe uma fase depois desta?
    temProxima(resultado) {
      return resultado.indiceDaFase + 1 < fases.length;
    },

    // Depois do resultado de uma vitória: próxima fase ou tela final.
    seguir(resultado) {
      if (this.temProxima(resultado)) this.comecar(resultado.indiceDaFase + 1);
      else if (existe('final')) mostrar('final');
      else this.escolherFase();
    }
  };

  /* ------------------------------------------------------------------------
     FIM DE FASE
     As regras avisam (fase-vencida / fase-perdida). Depois de uma pequena
     espera, para o jogador ver o último retorno, o jogo troca de tela.
     ------------------------------------------------------------------------ */
  R.eventos.ouvir('fase-vencida', (resultado) => {
    if (R.progresso) R.progresso.registrar(resultado);
    depoisDaEspera(() => {
      if (existe('cards')) mostrar('cards', resultado);
      else R.fluxo.resultado(resultado);
    });
  });

  R.eventos.ouvir('fase-perdida', (resultado) => {
    depoisDaEspera(() => R.fluxo.resultado(resultado));
  });

  function depoisDaEspera(funcao) {
    const espera = R.dados.config.esteira.esperaNoFim * 1000;
    setTimeout(() => {
      if (R.telas.atual === 'jogo') funcao();
    }, espera);
  }

  /* ------------------------------------------------------------------------
     PROBLEMA NOS DADOS
     Se a conferência dos dados achar um erro, o jogo não abre e mostra a
     lista do que precisa ser corrigido.
     ------------------------------------------------------------------------ */
  function mostrarProblemas(problemas) {
    const esc = R.util.esc;
    R.telas.criar('problemas', `
      <div class="pagina pagina-estreita">
        <h1>Há um problema nos dados do jogo</h1>
        <p>Corrija os arquivos da pasta <code>dados/</code> e recarregue a página.</p>
        <ul class="problemas-lista">
          ${problemas.map((problema) => '<li>' + esc(problema) + '</li>').join('')}
        </ul>
      </div>`);
    mostrar('problemas');
  }

  // Tudo carregado: abre o jogo.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => R.fluxo.abrir());
  } else {
    R.fluxo.abrir();
  }
})(window.Reciclando);
