Reciclando.dados.fases.push({
  id: 'casa',
  nome: 'Casa',
  ambiente: 'Cozinha de casa',
  cenario: 'imagens/cenarios/casa.svg',
  cor: '#FFEFC9',

  lixeiras: ['papel', 'plastico', 'organicos', 'rejeitos'],

  itens: [
    'folha-papel',
    'caixa-pizza-limpa',
    'garrafa-pet-vazia',
    'pote-plastico',
    'casca-banana',
    'resto-comida',
    'caixa-pizza-engordurada',
    'guardanapo-usado'
  ],

  emDobro: ['caixa-pizza-limpa', 'caixa-pizza-engordurada'],

  quantidadeDeItens: 15,

  esteira: {
    travessia: 12,
    intervalo: 6
  },

  abertura: {
    resumo: 'Você está na cozinha de casa. Separe o que é reciclável, o que é orgânico e o que é rejeito.',
    novidade: 'Olhe o estado do item: caixa de pizza limpa vai em Papel, mas engordurada vai em Rejeitos.'
  },

  cardsPadrao: ['caixa-pizza-limpa', 'caixa-pizza-engordurada', 'casca-banana']
});
