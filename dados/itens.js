Reciclando.dados.itens = [

  // ---------- Entram na fase 1 (Casa) ----------
  {
    id: 'folha-papel',
    nome: 'Folha de papel',
    estado: 'limpo',
    condicao: 'Limpa e seca',
    lixeira: 'papel',
    imagem: 'imagens/itens/folha-papel.svg',
    dica: 'Papel limpo e seco é reciclável.',
    explicacao: 'Papel limpo e seco pode ser reciclado e virar papel novo. Por isso vai para Papel.',
    comparar: 'folha-papel-molhada'
  },
  {
    id: 'caixa-pizza-limpa',
    nome: 'Caixa de pizza limpa',
    estado: 'limpo',
    condicao: 'Limpa, seca e sem restos de comida',
    lixeira: 'papel',
    imagem: 'imagens/itens/caixa-pizza-limpa.svg',
    dica: 'Sem gordura nem restos de comida, é papelão limpo.',
    explicacao: 'Sem gordura, molho ou restos de comida, a caixa é papelão limpo e pode ser reciclada. Vai para Papel.',
    comparar: 'caixa-pizza-engordurada'
  },
  {
    id: 'garrafa-pet-vazia',
    nome: 'Garrafa PET vazia',
    estado: 'limpo',
    condicao: 'Vazia, limpa e seca',
    lixeira: 'plastico',
    imagem: 'imagens/itens/garrafa-pet-vazia.svg',
    dica: 'Garrafa PET vazia e limpa é reciclável.',
    explicacao: 'Vazia e limpa, a garrafa PET pode ser reciclada e virar novas embalagens e até tecido. Vai para Plástico.',
    comparar: 'garrafa-pet-liquido'
  },
  {
    id: 'pote-plastico',
    nome: 'Pote plástico limpo',
    estado: 'limpo',
    condicao: 'Vazio, limpo e seco',
    lixeira: 'plastico',
    imagem: 'imagens/itens/pote-plastico.svg',
    dica: 'Pote plástico vazio e limpo é reciclável.',
    explicacao: 'Potes de plástico vazios e limpos são recicláveis. Se estivesse com restos de comida, iria para Rejeitos.'
  },
  {
    id: 'casca-banana',
    nome: 'Casca de banana',
    condicao: 'Resto de fruta',
    lixeira: 'organicos',
    imagem: 'imagens/itens/casca-banana.svg',
    dica: 'Cascas de frutas são resíduos orgânicos.',
    explicacao: 'Cascas e restos de frutas são resíduos orgânicos. Separados, podem virar adubo na compostagem.'
  },
  {
    id: 'resto-comida',
    nome: 'Resto de comida',
    condicao: 'Sem embalagem',
    lixeira: 'organicos',
    imagem: 'imagens/itens/resto-comida.svg',
    dica: 'Restos de comida são resíduos orgânicos.',
    explicacao: 'Restos de comida são resíduos orgânicos. Longe dos recicláveis, eles não sujam o papel nem o plástico.'
  },
  {
    id: 'caixa-pizza-engordurada',
    nome: 'Caixa de pizza engordurada',
    estado: 'sujo',
    condicao: 'Com gordura e restos de comida',
    lixeira: 'rejeitos',
    imagem: 'imagens/itens/caixa-pizza-engordurada.svg',
    dica: 'Gordura e restos de comida estragam o papel.',
    explicacao: 'A gordura e os restos de comida contaminam o papel e atrapalham a reciclagem. Por isso a caixa engordurada vai para Rejeitos.',
    comparar: 'caixa-pizza-limpa'
  },
  {
    id: 'guardanapo-usado',
    nome: 'Guardanapo usado',
    estado: 'sujo',
    condicao: 'Usado e sujo',
    lixeira: 'rejeitos',
    imagem: 'imagens/itens/guardanapo-usado.svg',
    dica: 'Papel usado e sujo não é reciclado.',
    explicacao: 'Guardanapo, papel-toalha e papel higiênico usados estão sujos e não são reciclados. Vão para Rejeitos.'
  },

  // ---------- Entram na fase 2 (Escola) ----------
  {
    id: 'lata-aluminio',
    nome: 'Lata de alumínio',
    estado: 'limpo',
    condicao: 'Vazia e limpa',
    lixeira: 'metal',
    imagem: 'imagens/itens/lata-aluminio.svg',
    dica: 'Lata de alumínio vazia é reciclável.',
    explicacao: 'Latas de alumínio vazias são recicláveis: o alumínio pode ser derretido e usado de novo muitas vezes. Vai para Metal.'
  },
  {
    id: 'lata-conserva',
    nome: 'Lata de conserva',
    estado: 'limpo',
    condicao: 'Vazia e limpa',
    lixeira: 'metal',
    imagem: 'imagens/itens/lata-conserva.svg',
    dica: 'Lata de aço vazia e limpa é reciclável.',
    explicacao: 'Latas de aço, como as de milho e ervilha, são recicláveis quando estão vazias e limpas. Vão para Metal.'
  },
  {
    id: 'pote-vidro',
    nome: 'Pote de vidro inteiro',
    estado: 'limpo',
    condicao: 'Inteiro, vazio e limpo',
    lixeira: 'vidro',
    imagem: 'imagens/itens/pote-vidro.svg',
    dica: 'Pote de vidro inteiro e limpo é reciclável.',
    explicacao: 'Potes de vidro inteiros, vazios e limpos são recicláveis: o vidro pode ser derretido e virar embalagem de novo. Vai para Vidro.',
    comparar: 'copo-vidro-quebrado'
  },
  {
    id: 'garrafa-vidro',
    nome: 'Garrafa de vidro',
    estado: 'limpo',
    condicao: 'Inteira, vazia e limpa',
    lixeira: 'vidro',
    imagem: 'imagens/itens/garrafa-vidro.svg',
    dica: 'Garrafa de vidro inteira e vazia é reciclável.',
    explicacao: 'Garrafas de vidro inteiras e vazias são recicláveis. Vão para Vidro.'
  },
  {
    id: 'copo-vidro-quebrado',
    nome: 'Copo de vidro quebrado',
    estado: 'quebrado',
    condicao: 'Quebrado',
    lixeira: 'rejeitos',
    imagem: 'imagens/itens/copo-vidro-quebrado.svg',
    dica: 'Vidro quebrado pode cortar quem faz a triagem.',
    explicacao: 'Cacos de vidro podem cortar quem trabalha na coleta e na triagem. Neste jogo, todo vidro quebrado vai para Rejeitos.',
    nota: 'Na vida real, embrulhe os cacos em jornal ou coloque-os em uma caixa antes de descartar.',
    comparar: 'pote-vidro'
  },

  // ---------- Entram na fase 3 (Cooperativa) ----------
  {
    id: 'folha-papel-molhada',
    nome: 'Folha de papel molhada',
    estado: 'molhado',
    condicao: 'Molhada',
    lixeira: 'rejeitos',
    imagem: 'imagens/itens/folha-papel-molhada.svg',
    dica: 'Papel molhado se desmancha e não é reciclado.',
    explicacao: 'Papel molhado se desmancha, pode mofar e perde o valor para a reciclagem. Neste jogo, vai para Rejeitos.',
    nota: 'Na vida real, guarde o papel reciclável em um lugar seco.',
    comparar: 'folha-papel'
  },
  {
    id: 'garrafa-pet-liquido',
    nome: 'Garrafa PET com líquido',
    estado: 'liquido',
    condicao: 'Com líquido dentro',
    lixeira: 'rejeitos',
    imagem: 'imagens/itens/garrafa-pet-liquido.svg',
    dica: 'Com líquido dentro, ela suja os outros recicláveis.',
    explicacao: 'O líquido vaza e suja o papel e os outros recicláveis do lote. Neste jogo você não pode esvaziar a garrafa, então ela vai para Rejeitos.',
    nota: 'Na vida real, esvazie a garrafa antes de separar: aí ela vai para Plástico.',
    comparar: 'garrafa-pet-vazia'
  },
  {
    id: 'pilha',
    nome: 'Pilha',
    condicao: 'Usada',
    lixeira: 'pilhas',
    imagem: 'imagens/itens/pilha.svg',
    dica: 'Pilhas têm metais que contaminam o solo e a água.',
    explicacao: 'Pilhas e baterias têm metais que contaminam o solo e a água. Nunca vão para lixeiras comuns: têm um ponto de coleta só delas.'
  },

  // ---------- Entram na fase 4 (Centro de Resíduos Especiais) ----------
  {
    id: 'celular-antigo',
    nome: 'Celular antigo',
    condicao: 'Sem uso',
    lixeira: 'eletronicos',
    imagem: 'imagens/itens/celular-antigo.svg',
    dica: 'Eletrônicos têm peças que não podem ir para o lixo comum.',
    explicacao: 'Celulares têm metais valiosos, que podem ser reaproveitados, e substâncias tóxicas. Devem ir para um ponto de coleta de eletrônicos.'
  },
  {
    id: 'lampada',
    nome: 'Lâmpada fluorescente',
    condicao: 'Queimada',
    lixeira: 'lampadas',
    imagem: 'imagens/itens/lampada.svg',
    dica: 'Lâmpadas fluorescentes têm mercúrio.',
    explicacao: 'Lâmpadas fluorescentes têm mercúrio, uma substância tóxica. Não vão para Vidro nem para Rejeitos: têm um ponto de coleta próprio.'
  },
  {
    id: 'medicamento-vencido',
    nome: 'Medicamento vencido',
    condicao: 'Vencido',
    lixeira: 'medicamentos',
    imagem: 'imagens/itens/medicamento-vencido.svg',
    dica: 'Remédio no lixo comum contamina a água e o solo.',
    explicacao: 'Remédios jogados no lixo, na pia ou no vaso contaminam a água e o solo. Devem ir para um ponto de coleta de medicamentos; muitas farmácias têm um.'
  },
  {
    id: 'embalagem-quimica',
    nome: 'Embalagem de produto químico',
    condicao: 'Vazia, com símbolo de perigo',
    lixeira: 'perigosos',
    imagem: 'imagens/itens/embalagem-quimica.svg',
    dica: 'Mesmo vazia, guarda restos de produto perigoso.',
    explicacao: 'Mesmo vazia, a embalagem guarda restos do produto. O símbolo de perigo avisa que ela não pode ir para Plástico: vai para Perigosos.'
  },
  {
    id: 'seringa',
    nome: 'Seringa',
    condicao: 'Usada',
    lixeira: 'hospitalares',
    imagem: 'imagens/itens/seringa.svg',
    dica: 'Agulhas podem ferir e transmitir doenças.',
    explicacao: 'Agulhas e seringas podem ferir e transmitir doenças a quem faz a coleta. Devem ir para um coletor de resíduos de saúde.'
  }
];
