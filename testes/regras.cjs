const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = {};
context.window = context;
for (const file of ['js/base.js','dados/config.js','dados/lixeiras.js','dados/itens.js','dados/fases/fase1-casa.js','js/regras/sorteio.js','js/regras/partida.js']) vm.runInNewContext(fs.readFileSync(file,'utf8'),context);
const R = context.window.Reciclando;
const fase = R.dados.fases[0];
const dados = {
  itens: fase.itens.map(id => R.dados.itens.find(x => x.id === id)),
  lixeiras: fase.lixeiras.map(id => R.dados.lixeiras.find(x => x.id === id)),
  esteira: {...fase.esteira, quantidade: fase.quantidadeDeItens, esperaInicial: R.dados.config.esteira.esperaInicial}
};
assert.equal(R.dados.itens.length, 21);
assert.equal(R.dados.lixeiras.length, 12);
assert.equal(dados.esteira.quantidade, 15);
assert.equal(dados.esteira.intervalo, 6);
assert.equal(dados.esteira.travessia, 12);
assert.equal(dados.lixeiras.length,4);
assert.equal(dados.itens.length,8);
for (const item of dados.itens) {
  assert.ok(dados.lixeiras.some(x=>x.id===item.lixeira));
  assert.ok(fs.existsSync(item.imagem));
}
for (const lixeira of dados.lixeiras) assert.ok(fs.existsSync(lixeira.imagem));
let partida = R.criarPartida(dados);
assert.equal(partida.descartar('papel'),null);
partida.atualizar(1.1);
assert.equal(partida.estado.itens.length,1);
const primeiro = partida.estado.itens[0];
assert.equal(partida.descartar('invalida'),null);
assert.equal(partida.estado.itens[0],primeiro);
assert.equal(partida.descartar(primeiro.item.lixeira).acertou,true);
partida.atualizar(6);
assert.equal(partida.descartar(dados.lixeiras.find(x=>x.id!==partida.estado.itens[0].item.lixeira).id).acertou,false);
partida.reiniciar();
assert.equal(partida.estado.passaram,0);
assert.equal(partida.estado.itens.length,0);
partida.atualizar(7.1);
assert.equal(partida.estado.itens.length,2);
const alvo = partida.estado.itens[0];
partida.descartar(alvo.item.lixeira);
assert.notEqual(partida.estado.itens[0].numero,alvo.numero);
partida = R.criarPartida(dados);
const quedas = partida.atualizar(110);
assert.equal(quedas.length,15);
assert.ok(quedas.every(x=>x.caiu && !x.acertou));
assert.equal(partida.estado.terminou,true);
assert.equal(partida.estado.itens.length,0);
assert.equal(partida.descartar('papel'),null);
partida.reiniciar();
const vistos = new Set();
while (!partida.estado.terminou) {
  partida.atualizar(0.1);
  if (partida.estado.itens.length) {
    const item = partida.estado.itens[0].item;
    vistos.add(item.id);
    assert.equal(partida.descartar(item.lixeira).acertou,true);
  }
}
assert.equal(vistos.size,8);
assert.equal(partida.estado.passaram,15);
console.log('OK: dados, imagens, entrada, movimento, descarte, erro, queda, reinício e rodada completa.');

partida = R.criarPartida(dados);
partida.atualizar(1);
assert.equal(partida.estado.itens[0].progresso, 0);
partida.atualizar(6);
assert.equal(partida.estado.itens.length, 2);
assert.equal(partida.estado.itens[0].progresso, 0.5);
assert.equal(partida.estado.itens[1].progresso, 0);
assert.equal(partida.atualizar(6).length, 1);

console.log('OK: catalogos, imagens da Casa, tempos exatos, descarte, erro, queda, reinicio e 15 itens.');
