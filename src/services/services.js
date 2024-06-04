// Importa o módulo 'dataSource' que contém os modelos do banco de dados.
// O caminho '../database/models' sugere que este módulo exporta todos os modelos definidos para o banco de dados.
const dataSource = require('../database/models');

// Define a classe 'Services', que encapsula operações comuns para um modelo de banco de dados específico.
class Services {
  // O construtor recebe o nome do modelo e o armazena na propriedade 'this.model'.
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  // Método assíncrono que retorna todos os registros do modelo, podendo aceitar uma condição 'where'.
  async pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where }});
  }

  // Método assíncrono que retorna registros filtrados por um escopo específico.
  async pegaRegistrosPorEscopo(escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  // Método assíncrono que retorna um único registro pelo seu ID.
  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  // Método assíncrono que retorna um único registro que satisfaça a condição 'where'.
  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: { ...where } });
  }

  // Método assíncrono que retorna registros e a contagem total dos registros que satisfaçam 'options'.
  async pegaEContaRegistros(options) {
    return dataSource[this.model].findAndCountAll({ ...options });
  }

  // Método assíncrono que cria um novo registro com os dados fornecidos.
  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  // Método assíncrono que atualiza registros que satisfaçam a condição 'where' com os 'dadosAtualizados'.
  // Pode aceitar uma transação opcional.
  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listadeRegistrosAtualizados = await dataSource[this.model]
      .update(dadosAtualizados, {
        where: { ...where },
        transaction: transacao
      });
    // Verifica se algum registro foi atualizado. Se nenhum registro foi atualizado, retorna false.
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  // Método assíncrono que exclui um registro pelo seu ID.
  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

// Exporta a classe 'Services', permitindo que seja utilizada em outros arquivos.
module.exports = Services;
