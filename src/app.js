// Importa o framework Express, que será utilizado para criar o servidor web
const express = require('express');

// Importa as rotas principais definidas no arquivo 'routes.js'
const routes = require('./routes');

// Cria uma instância do aplicativo Express
const app = express();

// Configura as rotas do aplicativo Express, passando a instância do aplicativo como parâmetro
routes(app);

// Exporta o aplicativo Express para que ele possa ser iniciado em outro arquivo
module.exports = app;