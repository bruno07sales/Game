/* ==========================================================================
   RECICLANDO — dados/fases/fase3-cooperativa.js   (GDD, seção 16)
   Fase 3: Cooperativa de Reciclagem. Entram os estados "molhado" e "com
   líquido" e o primeiro ponto de coleta especial (pilhas e baterias).
   A explicação de cada campo está em fase1-casa.js.
   ========================================================================== */
Reciclando.dados.fases.push({
  id: 'cooperativa',
  nome: 'Cooperativa de Reciclagem',
  ambiente: 'Linha de triagem da cooperativa',
  cenario: 'imagens/cenarios/cooperativa.svg',
  cor: '#DCE6EE',

  lixeiras: ['papel', 'plastico', 'metal', 'vidro', 'rejeitos', 'pilhas'],

  itens: [
    'folha-papel',
    'caixa-pizza-limpa',
    'garrafa-pet-vazia',
    'pote-plastico',
    'lata-aluminio',
    'lata-conserva',
    'pote-vidro',
    'garrafa-vidro',
    'caixa-pizza-engordurada',
    'guardanapo-usado',
    'copo-vidro-quebrado',
    'folha-papel-molhada',
    'garrafa-pet-liquido',
    'pilha'
  ],

  emDobro: ['folha-papel-molhada', 'garrafa-pet-liquido', 'pilha'],

  quantidadeDeItens: 25,

  esteira: {
    travessia: 8,
    intervalo: 4
  },

  abertura: {
    resumo: 'Você entrou na linha de triagem de uma cooperativa. A esteira está mais rápida.',
    novidade: 'Papel molhado e garrafa com líquido vão em Rejeitos. Pilhas têm um ponto de coleta só delas.'
  },

  cardsPadrao: ['garrafa-pet-liquido', 'folha-papel-molhada', 'pilha']
});
