'use strict';

// Importa o módulo fs para trabalhar com o sistema de arquivos
const fs = require('fs');
// Importa o módulo path para manipular caminhos de arquivos
const path = require('path');
// Importa o Sequelize para criar instâncias do ORM
const Sequelize = require('sequelize');
// Importa o módulo process para acessar variáveis de ambiente
const process = require('process');

// Obtém o nome do arquivo atual
const basename = path.basename(__filename);
// Obtém o ambiente de execução (development, test, production)
const env = process.env.NODE_ENV || 'development';
// Obtém as configurações do banco de dados correspondentes ao ambiente atual
const config = require(__dirname + '/../config/config.json')[env];
// Objeto para armazenar os modelos carregados
const db = {};

// Inicializa o objeto Sequelize
let sequelize;
if (config.use_env_variable) {
  // Se a configuração usar uma variável de ambiente para a conexão, usa essa variável
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Caso contrário, usa as informações fornecidas no arquivo de configuração
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lê todos os arquivos no diretório atual (exceto o arquivo atual)
fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filtra os arquivos que não começam com "." e não terminam com ".test.js"
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Para cada arquivo, importa o modelo e adiciona ao objeto db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associa os modelos, se houver métodos de associação definidos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona a instância do Sequelize e a classe Sequelize ao objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto db, que contém todos os modelos e a instância do Sequelize
module.exports = db;
