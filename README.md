# Reciclando

Jogo educativo sobre coleta seletiva e descarte adequado de resíduos.

Projeto desenvolvido na disciplina Projeto Aplicado VII A — Jogos Digitais, do curso de Engenharia de Software da Universidade do Distrito Federal (UnDF), semestre 2026.2.

## Equipe

- Bruno Araújo Sales
- Pablo Miranda dos Santos
- Gabriel Martins da Silva

## Estrutura

```
reciclando/
├── index.html      abre o jogo e lista, em ordem, todos os arquivos usados
├── dados/          O QUE o jogo tem: números, lixeiras, itens, fases, sons
├── js/             COMO o jogo funciona
│   ├── base.js         usado por todos os outros (tem de ser o primeiro)
│   ├── regras/         o jogo sem a parte visual
│   ├── jogo/           a tela de jogo
│   ├── telas/          as outras telas
│   ├── extras/         sons
│   └── principal.js    qual tela vem depois de qual (tem de ser o último)
├── css/            aparência
├── imagens/        desenhos dos itens, das lixeiras e dos cenários
├── sons/           efeitos sonoros
└── fontes/         fontes e licenças
```

