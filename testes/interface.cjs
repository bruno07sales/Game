// Integra??o dos scripts reais com um DOM m?nimo. N?o substitui inspe??o visual.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Elemento {
  constructor() {
    this.children = []; this.dataset = {}; this.listeners = {}; this.nodes = new Map();
    this.style = {setProperty() {}};
    this.classList = {toggle() {}, add() {}, remove() {}};
    this.clientWidth = 800; this.textContent = '';
  }
  set innerHTML(html) { this.html = html; this.nodes.clear(); this.children = []; }
  get innerHTML() { return this.html || ''; }
  append(...filhos) { this.children.push(...filhos); }
  appendChild(filho) { this.append(filho); }
  querySelector(s) { if (!this.nodes.has(s)) this.nodes.set(s, new Elemento()); return this.nodes.get(s); }
  querySelectorAll() { return []; }
  contains() { return true; }
  remove() {}
  focus() {}
  setAttribute() {}
  addEventListener(nome, fn) { (this.listeners[nome] ||= []).push(fn); }
}
const palco = new Elemento(), eventos = {};
let agora = 0, quadro;
const document = {body: new Elemento(), hidden: false, querySelector: () => palco, createElement: () => new Elemento(),
  addEventListener(nome, fn) { (eventos[nome] ||= []).push(fn); }};
const context = {document, performance: {now: () => agora}, requestAnimationFrame: fn => { quadro = fn; },
  matchMedia: () => ({matches: true}), addEventListener() {}, setTimeout: fn => fn(), clearTimeout() {}};
context.window = context;
const html = fs.readFileSync('index.html', 'utf8');
for (const [, caminho] of html.matchAll(/<script(?: defer)? src="([^"]+)"/g)) {
  assert.ok(fs.existsSync(caminho), caminho);
  vm.runInNewContext(fs.readFileSync(caminho, 'utf8'), context, {filename: caminho});
}
for (const [, caminho] of html.matchAll(/<link[^>]+href="([^"]+)"/g)) assert.ok(fs.existsSync(caminho), caminho);
for (const arquivo of fs.readdirSync('css')) {
  const css = fs.readFileSync(path.join('css', arquivo), 'utf8');
  for (const [, recurso] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) assert.ok(fs.existsSync(path.join('css', recurso)), recurso);
}
const R = context.Reciclando;
for (const arquivo of fs.readdirSync('fontes').filter(nome => nome.endsWith('.woff2'))) {
  assert.equal(fs.readFileSync(path.join('fontes', arquivo)).toString('ascii', 0, 4), 'wOF2', arquivo);
}
assert.equal(R.telas.existe('creditos'), true);
assert.match(R.icone('pausa'), /<svg/);
// Ações delegadas usam o contrato local (evento, botão).
const selecao = palco.children.find(el => el.className === 'tela tela-fases');
R.fluxo.escolherFase();
const botaoFase = {dataset: {acao: 'escolher', indice: '0'}};
selecao.listeners.click.forEach(fn => fn({target: {closest: () => botaoFase}}));
assert.equal(R.telas.atual, 'abertura');
const abertura = palco.children.find(el => el.className === 'tela tela-abertura');
assert.match(abertura.querySelector('[data-painel]').innerHTML, /Lixeiras desta fase/);
R.fluxo.inicio();
for (const fase of R.dados.fases) {
  assert.ok(fs.existsSync(fase.cenario));
  for (const id of fase.itens) assert.ok(fs.existsSync(R.item(id).imagem));
  for (const id of fase.lixeiras) assert.ok(fs.existsSync(R.lixeira(id).imagem));
}
function avancar(segundos) { for (let i = 0; i < Math.ceil(segundos * 20); i++) { agora += 50; quadro(agora); } }
function comecar(i) { R.fluxo.jogar(i); assert.equal(R.telas.atual, 'abertura'); R.telas.mostrar('jogo'); R.partida.iniciar(i); }
assert.equal(R.telas.atual, 'inicial');
assert.equal(R.progresso.podeJogar(1), false);
R.fluxo.jogar(1); assert.equal(R.telas.atual, 'inicial');
comecar(0); avancar(1.1);
assert.equal(R.partida.estado.naEsteira.length, 1);
const primeiro = R.partida.estado.naEsteira[0];
R.partida.descartar(primeiro.item.lixeira);
assert.equal(R.partida.estado.pontos, 100);
R.partida.estado.pausada = true; const passaram = R.partida.estado.passaram;
avancar(20); assert.equal(R.partida.estado.passaram, passaram);
R.partida.estado.pausada = false;
avancar(1);
R.partida.descartar('invalida'); assert.equal(R.partida.estado.passaram, passaram);
// Prote??o do clique duplo sobre dois itens presentes.
comecar(0); avancar(7.1);
R.partida.descartar('papel'); R.partida.descartar('papel');
assert.equal(R.partida.estado.passaram, 1);
avancar(0.4); R.partida.descartar('papel'); assert.equal(R.partida.estado.passaram, 2);
// Derrota e pontuação sem valores negativos.
comecar(0); avancar(80);
assert.equal(R.partida.estado.erros, 5);
assert.equal(R.partida.estado.contaminacao, 100);
assert.equal(R.partida.estado.pontos, 0);
assert.equal(R.telas.atual, 'resultado');
assert.equal(R.progresso.podeJogar(1), false);
// Jornada completa, cards e desbloqueio sequencial.
for (let i = 0; i < 3; i++) {
  comecar(i);
  for (let passo = 0; !R.partida.estado.terminou && passo < 10000; passo++) {
    avancar(0.4);
    const entrada = R.partida.estado.naEsteira[0];
    if (entrada) R.partida.descartar(entrada.item.lixeira);
  }
  assert.equal(R.partida.estado.acertos, R.dados.fases[i].quantidadeDeItens);
  assert.equal(R.partida.estado.pontos, R.dados.fases[i].quantidadeDeItens * 100);
  avancar(2); assert.equal(R.telas.atual, 'cards');
  if (i < 2) assert.equal(R.progresso.podeJogar(i + 1), true);
}
assert.equal(R.progresso.total().pontos, 6000);
console.log('OK: carregamento real, recursos das três fases, pontuação, derrota, pausa, cliques, cards e desbloqueio.');
