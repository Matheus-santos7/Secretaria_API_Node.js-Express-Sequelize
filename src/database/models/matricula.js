'use strict';

// Importa a classe Model do Sequelize, que será estendida pela classe Matricula
const { Model } = require('sequelize');

// Exporta a definição do modelo Matricula, passando sequelize e DataTypes como parâmetros
module.exports = (sequelize, DataTypes) => {
  
  // Define a classe Matricula, que estende a classe Model do Sequelize
  class Matricula extends Model {
    
    // Define o método estático associate, responsável por definir associações entre modelos
    static associate(models) {
      
      // Estabelece a associação de muitos-para-um com o modelo Pessoa, onde uma matrícula pertence a uma pessoa (estudante)
      Matricula.belongsTo(models.Pessoa, {
        foreignKey: 'estudante_id' // Define a chave estrangeira que faz referência à estudante_id na tabela de matrículas
      });
      
      // Estabelece a associação de muitos-para-um com o modelo Curso, onde uma matrícula pertence a um curso
      Matricula.belongsTo(models.Curso, {
        foreignKey: 'curso_id' // Define a chave estrangeira que faz referência à curso_id na tabela de matrículas
      });
    }
  }
  
  // Inicializa o modelo Matricula com seus atributos e configurações
  Matricula.init({
    status: DataTypes.STRING // Define o atributo status como uma string
  }, {
    sequelize, // Passa a instância do sequelize para a inicialização do modelo
    modelName: 'Matricula', // Define o nome do modelo como Matricula
    tableName: 'matriculas', // Define o nome da tabela como matriculas no banco de dados
    paranoid: true, // Ativa a exclusão lógica para manter registros marcados como "deletados" em vez de removê-los fisicamente
  });
  
  // Retorna a classe Matricula após a inicialização
  return Matricula;
};
