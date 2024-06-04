// Importa o módulo 'express', que é um framework web para Node.js.
// 'express' facilita a criação de servidores e o gerenciamento de rotas.
const express = require('express');

// Importa as rotas definidas no arquivo './routes'.
// Isso permite separar a lógica das rotas do restante do código do servidor.
const routes = require('./routes');

// Cria uma instância do aplicativo Express.
// 'app' será usado para definir rotas e outras configurações do servidor.
const app = express();

// Chama a função 'routes' passando a instância 'app'.
// Isso configura todas as rotas que foram definidas no módulo './routes'.
routes(app);

// Exporta a instância do aplicativo Express.
// Isso permite que outros arquivos utilizem essa instância, como no arquivo principal do servidor que vimos anteriormente.
module.exports = app;
