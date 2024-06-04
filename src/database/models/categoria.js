'use strict';

// Importa a classe Model do Sequelize, que será estendida pela classe Categoria
const { Model } = require('sequelize');

// Exporta a definição do modelo Categoria, passando sequelize e DataTypes como parâmetros
module.exports = (sequelize, DataTypes) => {
  // Define a classe Categoria, que estende a classe Model do Sequelize
  class Categoria extends Model {
    // Define o método estático associate, responsável por definir associações entre modelos
    static associate(models) {
      // Estabelece uma associação de um-para-muitos com o modelo Curso, onde uma categoria pode ter muitos cursos
      Categoria.hasMany(models.Curso, {
        foreignKey: 'categoria_id' // Define a chave estrangeira que faz referência à categoria_id na tabela de cursos
      });
    }
  }

  // Inicializa o modelo Categoria com seus atributos e configurações
  Categoria.init({
    titulo: DataTypes.STRING // Define o atributo titulo como uma string
  }, {
    sequelize, // Passa a instância do sequelize para a inicialização do modelo
    modelName: 'Categoria', // Define o nome do modelo como Categoria
    tableName: 'categorias', // Define o nome da tabela como categorias no banco de dados
    paranoid: true, // Ativa a exclusão lógica para manter registros marcados como "deletados" em vez de removê-los fisicamente
  });

  // Retorna a classe Categoria após a inicialização
  return Categoria;
};
