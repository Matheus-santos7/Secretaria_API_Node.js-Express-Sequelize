// Importa o módulo converteIds do arquivo conversorDeStringHelper.js, que será usado para converter parâmetros de string em números
const converteIds = require('../utils/conversorDeStringHelper.js');

// Define a classe Controller
class Controller {
  
  // Construtor da classe Controller, que recebe um serviço de entidade como parâmetro
  constructor(entidadeService) {
    this.entidadeService = entidadeService; // Atribui o serviço de entidade ao objeto Controller
  }

  // Método assíncrono para obter todos os registros da entidade
  async pegaTodos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros(); // Chama o método do serviço de entidade para obter todos os registros
      return res.status(200).json(listaDeRegistro); // Retorna a lista de registros em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para obter um registro por ID
  async pegaUmPorId(req, res) {
    const { id } = req.params; // Obtém o ID dos parâmetros da solicitação
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id)); // Chama o método do serviço de entidade para obter um registro por ID convertendo o ID para número
      return res.status(200).json(umRegistro); // Retorna o registro encontrado em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para obter um registro com base nos parâmetros da solicitação
  async pegaUm(req, res) {
    const { ...params } = req.params; // Obtém os parâmetros da solicitação
    const where = converteIds(params); // Converte os parâmetros de string para números usando a função converteIds
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where); // Chama o método do serviço de entidade para obter um registro com base nos parâmetros
      return res.status(200).json(umRegistro); // Retorna o registro encontrado em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para criar um novo registro
  async criaNovo(req, res) {
    const dadosParaCriacao = req.body; // Obtém os dados para criação do corpo da solicitação
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao); // Chama o método do serviço de entidade para criar um novo registro
      return res.status(200).json(novoRegistroCriado); // Retorna o novo registro criado em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para atualizar um registro existente
  async atualiza(req, res) {
    const { ...params } = req.params; // Obtém os parâmetros da solicitação
    const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da solicitação

    const where = converteIds(params); // Converte os parâmetros de string para números usando a função converteIds
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where); // Chama o método do serviço de entidade para atualizar um registro
      if (!foiAtualizado) { // Verifica se o registro foi atualizado com sucesso
        return res.status(400).json({ mensagem: 'registro não foi atualizado' }); // Retorna uma mensagem de erro com status 400 se o registro não foi atualizado
      }
      return res.status(200).json({ mensagem: 'Atualizado com sucesso' }); // Retorna uma mensagem de sucesso com status 200 se o registro foi atualizado com sucesso
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para excluir um registro
  async exclui(req, res) {
    const { id } = req.params; // Obtém o ID dos parâmetros da solicitação
    try {
      await this.entidadeService.excluiRegistro(Number(id)); // Chama o método do serviço de entidade para excluir um registro convertendo o ID para número
      return res.status(200).json({ mensagem: `id ${id} deletado` }); // Retorna uma mensagem de sucesso com status 200 após a exclusão do registro
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }
}

// Exporta a classe Controller
module.exports = Controller;
