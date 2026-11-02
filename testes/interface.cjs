// Integração sem navegador: carrega os scripts na ordem real do HTML.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Elemento {
  constructor() { this.children = []; this.dataset = {}; this.textContent = ''; this.listeners = {}; this.style = {setProperty() {}}; this.classList = {toggle() {}}; }
  append(...filhos) { this.children.push(...filhos); }
  remove() {}
  addEventListener(nome, fn) { this.listeners[nome] = fn; }
}
const elementos = Object.fromEntries(['pista', 'retorno', 'item-atual', 'andamento', 'lixeiras', 'reiniciar'].map(id => [id, new Elemento()]));
let agora = 0, quadro;
const eventos = {};
const document = {
  hidden: false,
  querySelector: seletor => elementos[seletor.slice(1)],
  createElement: () => new Elemento(),
  addEventListener: (nome, fn) => { eventos[nome] = fn; }
};
const context = {document, performance: {now: () => agora}, requestAnimationFrame: fn => { quadro = fn; }};
context.window = context;
const html = fs.readFileSync('index.html', 'utf8');
for (const [, caminho] of html.matchAll(/<script defer src="([^"]+)"/g)) vm.runInNewContext(fs.readFileSync(caminho, 'utf8'), context, {filename: caminho});
for (const [, caminho] of html.matchAll(/<link[^>]+href="([^"]+)"/g)) assert.ok(fs.existsSync(caminho), caminho);
assert.equal(elementos.lixeiras.children.length, 4);
function avancar(segundos) {
  for (let i = 0; i < segundos * 20; i++) { agora += 50; quadro(agora); }
}
avancar(1.1);
assert.match(elementos['item-atual'].textContent, /Item da vez:/);
const clicar = id => elementos.lixeiras.listeners.click({target: {closest: () => ({dataset: {lixeira: id}})}});
clicar('papel');
assert.match(elementos.andamento.textContent, /1 \/ 15/);
assert.match(elementos.retorno.textContent, /Correto!|descarte incorreto/);
elementos.reiniciar.listeners.click();
assert.match(elementos.andamento.textContent, /0 \/ 15/);
document.hidden = true; eventos.visibilitychange();
avancar(60);
assert.match(elementos['item-atual'].textContent, /Aguardando/);
document.hidden = false; eventos.visibilitychange();
avancar(1.1);
assert.match(elementos['item-atual'].textContent, /Item da vez:/);
avancar(12);
assert.match(elementos.retorno.textContent, /caiu da esteira/);
console.log('OK: scripts e caminhos, interface, clique, feedback, reinicio, pausa e retomada.');
