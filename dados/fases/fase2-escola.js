Reciclando.dados.fases.push({
  id: 'escola',
  nome: 'Escola',
  ambiente: 'Cantina da escola',
  cenario: 'imagens/cenarios/escola.svg',
  cor: '#D9EEE6',

  lixeiras: ['papel', 'plastico', 'metal', 'vidro', 'rejeitos'],

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
    'copo-vidro-quebrado'
  ],

  emDobro: ['lata-aluminio', 'pote-vidro', 'copo-vidro-quebrado'],

  quantidadeDeItens: 20,

  esteira: {
    travessia: 10,
    intervalo: 5
  },

  abertura: {
    resumo: 'Hora do recreio na cantina da escola. Agora há lixeiras de Metal e de Vidro.',
    novidade: 'O que está quebrado vai em Rejeitos, mesmo sendo de vidro.'
  },

  cardsPadrao: ['pote-vidro', 'copo-vidro-quebrado', 'lata-aluminio']
});
