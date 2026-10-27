Reciclando.dados.lixeiras = [

  // ---------- Entram na fase 1 (Casa) ----------
  {
    id: 'papel',
    nome: 'Papel',
    tipo: 'comum',
    cor: '#1E73D8',
    imagem: 'imagens/lixeiras/papel.svg',
    regra: 'Papel e papelão limpos e secos.',
    selo: 'Pode ser reciclado',
    reciclavel: true
  },
  {
    id: 'plastico',
    nome: 'Plástico',
    tipo: 'comum',
    cor: '#E03131',
    imagem: 'imagens/lixeiras/plastico.svg',
    regra: 'Embalagens de plástico vazias, limpas e sem líquido.',
    selo: 'Pode ser reciclado',
    reciclavel: true
  },
  {
    id: 'organicos',
    nome: 'Orgânicos',
    tipo: 'comum',
    cor: '#8A5A33',
    imagem: 'imagens/lixeiras/organicos.svg',
    regra: 'Cascas e restos de comida, sem embalagem.',
    selo: 'Pode virar adubo',
    reciclavel: true
  },
  {
    id: 'rejeitos',
    nome: 'Rejeitos',
    tipo: 'comum',
    cor: '#7B838C',
    imagem: 'imagens/lixeiras/rejeitos.svg',
    regra: 'O que está sujo, molhado, quebrado ou com líquido.',
    selo: 'Não vai para a reciclagem comum',
    reciclavel: false
  },

  // ---------- Entram na fase 2 (Escola) ----------
  {
    id: 'metal',
    nome: 'Metal',
    tipo: 'comum',
    cor: '#F5C211',
    imagem: 'imagens/lixeiras/metal.svg',
    regra: 'Latas vazias e limpas.',
    selo: 'Pode ser reciclado',
    reciclavel: true
  },
  {
    id: 'vidro',
    nome: 'Vidro',
    tipo: 'comum',
    cor: '#2F9E44',
    imagem: 'imagens/lixeiras/vidro.svg',
    regra: 'Garrafas e potes de vidro inteiros, vazios e limpos.',
    selo: 'Pode ser reciclado',
    reciclavel: true
  },

  // ---------- Entra na fase 3 (Cooperativa) ----------
  {
    id: 'pilhas',
    nome: 'Pilhas e baterias',
    tipo: 'especial',
    cor: '#E64980',
    imagem: 'imagens/lixeiras/pilhas.svg',
    regra: 'Pilhas e baterias usadas.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  },

  // ---------- Entram na fase 4 (Centro de Resíduos Especiais) ----------
  {
    id: 'eletronicos',
    nome: 'Eletrônicos',
    tipo: 'especial',
    cor: '#0B8C8C',
    imagem: 'imagens/lixeiras/eletronicos.svg',
    regra: 'Celulares e outros aparelhos eletrônicos.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  },
  {
    id: 'lampadas',
    nome: 'Lâmpadas',
    tipo: 'especial',
    cor: '#8FBF26',
    imagem: 'imagens/lixeiras/lampadas.svg',
    regra: 'Lâmpadas fluorescentes queimadas.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  },
  {
    id: 'medicamentos',
    nome: 'Medicamentos',
    tipo: 'especial',
    cor: '#2B3A8C',
    imagem: 'imagens/lixeiras/medicamentos.svg',
    regra: 'Remédios vencidos ou que sobraram.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  },
  {
    id: 'perigosos',
    nome: 'Perigosos',
    tipo: 'especial',
    cor: '#F76707',
    imagem: 'imagens/lixeiras/perigosos.svg',
    regra: 'Embalagens de produtos químicos com símbolo de perigo.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  },
  {
    id: 'hospitalares',
    nome: 'Hospitalares',
    tipo: 'especial',
    cor: '#F1F3F5',
    imagem: 'imagens/lixeiras/hospitalares.svg',
    regra: 'Seringas, agulhas e outros materiais de saúde.',
    selo: 'Precisa de ponto de coleta especial',
    reciclavel: false
  }
];
