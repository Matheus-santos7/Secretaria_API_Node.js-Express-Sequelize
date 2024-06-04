'use strict';

// Importa a função isCpfValido do arquivo validaCpfHelper.js para validar CPFs
const isCpfValido = require('../../utils/validaCpfHelper.js');

// Importa a classe Model do Sequelize, que será estendida pela classe Pessoa
const { Model } = require('sequelize');

// Exporta a definição do modelo Pessoa, passando sequelize e DataTypes como parâmetros
module.exports = (sequelize, DataTypes) => {
  
  // Define a classe Pessoa, que estende a classe Model do Sequelize
  class Pessoa extends Model {
    
    // Define o método estático associate, responsável por definir associações entre modelos
    static associate(models) {
      
      // Estabelece a associação de um-para-muitos com o modelo Curso, onde uma pessoa pode ser docente de muitos cursos
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id' // Define a chave estrangeira que faz referência à docente_id na tabela de cursos
      });
      
      // Estabelece a associação de um-para-muitos com o modelo Matricula, onde uma pessoa pode ter muitas matrículas
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id', // Define a chave estrangeira que faz referência à estudante_id na tabela de matrículas
        scope: { status: 'matriculado' }, // Define um escopo para filtrar as matrículas com status 'matriculado'
        as: 'aulasMatriculadas' // Define um alias para a associação
      });

      // Estabelece outra associação de um-para-muitos com o modelo Matricula, onde uma pessoa pode ter muitas matrículas
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id', // Define a chave estrangeira que faz referência à estudante_id na tabela de matrículas
        as: 'todasAsMatriculadas' // Define um alias para a associação
      });
    }
  }
  
  // Inicializa o modelo Pessoa com seus atributos e configurações
  Pessoa.init({
    nome: {
      type: DataTypes.STRING, // Define o tipo do atributo nome como uma string
      validate: {
        len: { // Define uma validação de comprimento mínimo e máximo para o nome
          args: [3, 30], // Define os argumentos como [comprimento mínimo, comprimento máximo]
          msg: 'o campo nome deve ter no mínimo 3 caracteres' // Define a mensagem de erro personalizada
        }
      }
    },
    email: {
      type: DataTypes.STRING, // Define o tipo do atributo email como uma string
      validate: {
        isEmail: { // Define uma validação para garantir que o email tenha um formato válido
          args: true, // Define os argumentos como verdadeiros para usar a validação isEmail do Sequelize
          msg: 'formato do email inválido' // Define a mensagem de erro personalizada
        }
      }
    },
    cpf: {
      type: DataTypes.STRING, // Define o tipo do atributo cpf como uma string
      validate: {
        cpfEhValido: (cpf) => { // Define uma validação personalizada para verificar se o CPF é válido
          if (!isCpfValido(cpf)) throw new Error('numero de CPF inválido'); // Lança um erro se o CPF não for válido
        }
      }
    },
    ativo: DataTypes.BOOLEAN, // Define o tipo do atributo ativo como um booleano
    role: DataTypes.STRING // Define o tipo do atributo role como uma string
  }, {
    sequelize, // Passa a instância do sequelize para a inicialização do modelo
    modelName: 'Pessoa', // Define o nome do modelo como Pessoa
    tableName: 'pessoas', // Define o nome da tabela como pessoas no banco de dados
    paranoid: true, // Ativa a exclusão lógica para manter registros marcados como "deletados" em vez de removê-los fisicamente
    defaultScope: {
      where: {
        ativo: true, // Define o escopo padrão para filtrar registros ativos
      }
    },
    scopes: {
      todosOsRegistros: { // Define um escopo chamado todosOsRegistros para recuperar todos os registros, independentemente do status ativo
        where: {} // Define as condições de busca vazias para retornar todos os registros
      }
    }
  });
  
  // Retorna a classe Pessoa após a inicialização
  return Pessoa;
};
