// Interface única: esteira, lixeiras, retorno e reinício.
(function (R) {
  'use strict';
  R.iniciarInterface = function (dados) {
  const partida = R.criarPartida(dados);
  const pista = document.querySelector('#pista');
  const retorno = document.querySelector('#retorno');
  const atual = document.querySelector('#item-atual');
  const andamento = document.querySelector('#andamento');
  const lixeiras = document.querySelector('#lixeiras');
  const elementos = new Map();
  let ultimo = performance.now();
  let itemAnunciado;
  let ultimoDescarte = -Infinity;
  let ultimaLixeira;
  for (const lixeira of dados.lixeiras) {
    const botao = document.createElement('button');
    botao.type = 'button'; botao.dataset.lixeira = lixeira.id;
    botao.style.setProperty('--cor', lixeira.cor);
    const imagem = document.createElement('img'); imagem.src = lixeira.imagem; imagem.alt = '';
    const nome = document.createElement('span'); nome.textContent = lixeira.nome;
    botao.append(imagem, nome); lixeiras.append(botao);
  }
  function informar(jogada) {
    if (!jogada) return;
    const destino = dados.lixeiras.find(x => x.id === jogada.item.lixeira).nome;
    retorno.dataset.tipo = jogada.acertou ? 'acerto' : 'erro';
    retorno.textContent = jogada.acertou
      ? 'Correto! ' + jogada.item.nome + ' vai em ' + destino + '.'
      : jogada.item.nome + (jogada.caiu ? ' caiu da esteira. ' : ': descarte incorreto. ') + 'Destino correto: ' + destino + '.';
  }
  function desenhar() {
    const estado = partida.estado;
    const presentes = new Set(estado.itens.map(x => x.numero));
    for (const [numero, elemento] of elementos) {
      if (!presentes.has(numero)) { elemento.remove(); elementos.delete(numero); }
    }
    estado.itens.forEach((entrada, indice) => {
      let elemento = elementos.get(entrada.numero);
      if (!elemento) {
        elemento = document.createElement('div'); elemento.className = 'item';
        const img = document.createElement('img'); img.src = entrada.item.imagem; img.alt = '';
        const nome = document.createElement('span'); nome.textContent = entrada.item.nome;
        elemento.append(img, nome); pista.append(elemento); elementos.set(entrada.numero, elemento);
      }
      elemento.classList.toggle('da-vez', indice === 0);
      elemento.style.left = (entrada.progresso * 100) + '%';
    });
    const entrada = estado.itens[0];
    const anuncio = entrada ? 'Item da vez: ' + entrada.item.nome + ' — ' + entrada.item.condicao : estado.terminou ? 'Rodada concluída. Clique em Reiniciar para jogar novamente.' : 'Aguardando o próximo item…';
    if (anuncio !== itemAnunciado) { atual.textContent = anuncio; itemAnunciado = anuncio; }
    andamento.textContent = 'Itens concluídos: ' + estado.passaram + ' / ' + dados.esteira.quantidade;
  }
  lixeiras.addEventListener('click', evento => {
    const botao = evento.target.closest('button[data-lixeira]');
    if (!botao || document.hidden) return;
    const id = botao.dataset.lixeira;
    const agora = performance.now();
    const intervalo = R.dados.config.esteira.pausaEntreCliques * 1000;
    if (id === ultimaLixeira && agora - ultimoDescarte < intervalo) return;
    const jogada = partida.descartar(id);
    if (jogada) {
      ultimoDescarte = agora; ultimaLixeira = id;
      informar(jogada); desenhar();
    }
  });
  document.querySelector('#reiniciar').addEventListener('click', () => {
    partida.reiniciar(); ultimo = performance.now();
    ultimoDescarte = -Infinity; ultimaLixeira = undefined;
    retorno.textContent = 'Observe o material e o estado de cada item.';
    delete retorno.dataset.tipo; desenhar();
  });
  document.addEventListener('visibilitychange', () => { ultimo = performance.now(); });
  function quadro(agora) {
    const dt = Math.min((agora - ultimo) / 1000, 0.1); ultimo = agora;
    if (!document.hidden) { partida.atualizar(dt).forEach(informar); desenhar(); }
    requestAnimationFrame(quadro);
  }
  desenhar(); requestAnimationFrame(quadro);
  };
})(window.Reciclando);
