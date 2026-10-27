Reciclando.dados.config = {

  // PONTUAÇÃO (GDD, seção 8)
  pontos: {
    acerto: 100,  // ganha a cada descarte certo
    erro: 50      // perde a cada descarte errado ou item que cai da esteira
                  // (a pontuação nunca fica abaixo de zero)
  },

  // CONTAMINAÇÃO DO LOTE (GDD, seção 9)
  contaminacao: {
    porErro: 20,  // quanto sobe a cada erro, em %  (100 / 20 = derrota no 5º erro)
    limite: 100,  // ao chegar aqui, o lote é perdido e a fase termina em derrota

    niveis: [
      { aPartirDe: 0,   texto: 'Lote limpo' },
      { aPartirDe: 20,  texto: 'Atenção' },
      { aPartirDe: 40,  texto: 'Contaminação moderada' },
      { aPartirDe: 60,  texto: 'Contaminação alta' },
      { aPartirDe: 80,  texto: 'Situação crítica' },
      { aPartirDe: 100, texto: 'Lote perdido' }
    ]
  },

  // ESTEIRA (os tempos de cada fase ficam em dados/fases/)
  esteira: {
    esperaInicial: 1,         // segundos entre o botão "Começar" e o primeiro item

    adiantarComEsteiraVazia: true,
    folgaDepoisDoAcerto: 0.8, // segundos de esteira vazia depois de um acerto
    folgaDepoisDoErro: 2.5,   // idem depois de um erro: tempo de ler a explicação

    pausaEntreCliques: 0.35,  // depois de um descarte, um novo clique na MESMA lixeira
                              // é ignorado por este tempo (evita que um clique duplo
                              // descarte dois itens); em outra lixeira, vale na hora
    esperaNoFim: 1.3          // segundos entre o último item e a tela seguinte
  },

  // CARDS EDUCATIVOS (GDD, seção 12)
  cards: {
    porFase: 3                // quantos cards aparecem no fim de cada fase
  },

  atalhoDeTeste: {
    ativo: true,
    cliques: 5
  },

  estados: {
    limpo:    'Limpo e seco',
    sujo:     'Sujo de comida ou gordura',
    quebrado: 'Quebrado',
    molhado:  'Molhado',
    liquido:  'Com líquido'
  }
};
