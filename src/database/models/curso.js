'use strict';

// Importa a classe Model do Sequelize, que será estendida pela classe Curso
const { Model } = require('sequelize');

// Exporta a definição do modelo Curso, passando sequelize e DataTypes como parâmetros
module.exports = (sequelize, DataTypes) => {
  
  // Define a classe Curso, que estende a classe Model do Sequelize
  class Curso extends Model {
    
    // Define o método estático associate, responsável por definir associações entre modelos
    static associate(models) {
      
      // Estabelece a associação de muitos-para-um com o modelo Categoria, onde um curso pertence a uma categoria
      Curso.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id' // Define a chave estrangeira que faz referência à categoria_id na tabela de cursos
      });
      
      // Estabelece a associação de muitos-para-um com o modelo Pessoa, onde um curso é ministrado por uma pessoa (docente)
      Curso.belongsTo(models.Pessoa, {
        foreignKey: 'docente_id' // Define a chave estrangeira que faz referência à docente_id na tabela de cursos
      });
      
      // Estabelece a associação de um-para-muitos com o modelo Matricula, onde um curso pode ter muitas matrículas
      Curso.hasMany(models.Matricula, {
        foreignKey: 'curso_id' // Define a chave estrangeira que faz referência à curso_id na tabela de matrículas
      });
    }
  }
  
  // Inicializa o modelo Curso com seus atributos e configurações
  Curso.init({
    titulo: DataTypes.STRING, // Define o atributo titulo como uma string
    descricao: DataTypes.STRING, // Define o atributo descricao como uma string
    data_inicio: DataTypes.DATEONLY // Define o atributo data_inicio como uma data (apenas data, sem hora)
  }, {
    sequelize, // Passa a instância do sequelize para a inicialização do modelo
    modelName: 'Curso', // Define o nome do modelo como Curso
    tableName: 'cursos', // Define o nome da tabela como cursos no banco de dados
    paranoid: true, // Ativa a exclusão lógica para manter registros marcados como "deletados" em vez de removê-los fisicamente
  });
  
  // Retorna a classe Curso após a inicialização
  return Curso;
};
