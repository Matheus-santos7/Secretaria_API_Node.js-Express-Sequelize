// Importa o framework Express para lidar com rotas HTTP.
const express = require('express');

// Importa os módulos que definem as rotas para pessoas, categorias e cursos.
const pessoas = require('./pessoasRoute.js');
const categorias = require('./categoriasRoute.js');
const cursos = require('./cursosRoute.js');

// Exporta uma função que configura as rotas da aplicação Express.
module.exports = app => {
  // Configura o middleware para fazer o parsing do corpo das requisições para JSON.
  // Isso permite acessar os dados enviados no corpo das requisições através de req.body.
  // O middleware express.json() faz o parsing do corpo da requisição e coloca os dados em req.body.
  // Isso é necessário para que as rotas possam acessar os dados enviados pelos clientes (por exemplo, em requisições POST).
  app.use(
    express.json(),
    // Registra as rotas definidas nos módulos importados.
    // O método use() do Express é usado para definir middleware ou montar rotas.
    // Quando um módulo de rota é passado para o método use(), o Express utiliza as rotas definidas no módulo.
    pessoas,
    categorias,
    cursos
  );
};
