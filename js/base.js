// Serviços compartilhados pelas regras e pelas telas.
window.Reciclando = { dados: { fases: [] } };
(function (R) {
  'use strict';
  const ouvintes = {};
  R.eventos = {
    ouvir(nome, fn) { (ouvintes[nome] ||= []).push(fn); },
    emitir(nome, dado) { (ouvintes[nome] || []).forEach(fn => fn(dado)); }
  };
  R.util = {
    esc(valor) { return String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c])); },
    numero(valor) { return Number(valor).toLocaleString('pt-BR'); }
  };
  R.item = id => R.dados.itens.find(item => item.id === id);
  R.lixeira = id => R.dados.lixeiras.find(lixeira => lixeira.id === id);
  R.dom = {
    criar(tag, classe) { const el = document.createElement(tag); el.className = classe; return el; },
    imagem(src, alt, classe) { return `<img src="${R.util.esc(src)}" alt="${R.util.esc(alt)}" class="${R.util.esc(classe)}">`; },
    acoes(el, acoes) { el.addEventListener('click', evento => {
      const botao = evento.target.closest('[data-acao]');
      if (botao && el.contains(botao) && !botao.disabled && acoes[botao.dataset.acao]) acoes[botao.dataset.acao](evento, botao);
    }); }
  };
  const desenhos = {
    certo: '<path d="M5 13l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
    errado: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>',
    queda: '<path d="M12 4v11M6.5 10.5L12 16l5.5-5.5M5 20h14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    seta: '<path d="M12 20.5L4 8h16z" fill="currentColor" stroke="#1B2A38" stroke-width="2.4" stroke-linejoin="round"/>',
    estrela: '<path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4L2.8 9.3l6.4-.8z" fill="currentColor"/>',
    cadeado: '<path d="M7.5 11V8a4.5 4.5 0 019 0v3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><rect x="4.5" y="11" width="15" height="10" rx="2.5" fill="currentColor"/>',
    pausa: '<rect x="6" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/>',
    somLigado: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 010 6M18 6.5a7.6 7.6 0 010 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    somDesligado: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    reciclavel: '<path d="M12 3.2l3.2 5.3-2.3 1.3M19.6 13.6l-2.7 5.2H11M4.4 13.6l2.7 5.2M9.2 6.4L6.3 11.6l2.4 1.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    atencao: '<path d="M12 3.5l9.5 16.5h-19z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 9.5v5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.4" fill="currentColor"/>'
  };

  R.icone = function (nome, classe) {
    return '<svg class="icone ' + (classe || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      (desenhos[nome] || '') + '</svg>';
  };

  const telas = new Map();
  R.telas = {
    atual: null,
    criar(id, html, mostrar) {
      const el = R.dom.criar('section', 'tela tela-' + id);
      el.hidden = true; el.innerHTML = html;
      document.querySelector('#palco').appendChild(el);
      telas.set(id, {el, mostrar}); return el;
    },
    existe(id) { return telas.has(id); },
    mostrar(id, dados) {
      const tela = telas.get(id);
      if (!tela) throw new Error('Tela inexistente: ' + id);
      telas.forEach(t => { t.el.hidden = t !== tela; });
      this.atual = id;
      document.body.dataset.tela = id;
      if (tela.mostrar) tela.mostrar(dados);
      tela.el.querySelector('[data-foco]')?.focus({preventScroll: true});
      tela.el.scrollTop = 0;
    }
  };
})(window.Reciclando);
