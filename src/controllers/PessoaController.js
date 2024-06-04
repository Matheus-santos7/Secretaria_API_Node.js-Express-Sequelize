// Importa a classe Controller
const Controller = require('./Controller.js');

// Importa o serviço PessoaServices
const PessoaServices = require('../services/PessoaServices.js');

// Cria uma instância de PessoaServices
const pessoaServices = new PessoaServices();

// Define a classe PessoaController, que estende a classe Controller
class PessoaController extends Controller {
  
  // Construtor da classe PessoaController
  constructor() {
    super(pessoaServices); // Chama o construtor da classe pai (Controller) passando o serviço PessoaServices como parâmetro
  }

  // Método assíncrono para obter matrículas ativas de um estudante
  async pegaMatriculasAtivas(req, res) {
    const { estudante_id } = req.params; // Obtém o ID do estudante dos parâmetros da solicitação
    try {
      // Chama o método do serviço de pessoa para obter matrículas ativas por estudante
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas); // Retorna a lista de matrículas ativas em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para obter todas as matrículas de um estudante
  async pegaTodasAsMatriculas(req, res) {
    const { estudante_id } = req.params; // Obtém o ID do estudante dos parâmetros da solicitação
    try {
      // Chama o método do serviço de pessoa para obter todas as matrículas por estudante
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas); // Retorna a lista de todas as matrículas em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para obter todas as pessoas
  async pegaTodasAsPessoas(req, res) {
    try {
      // Chama o método do serviço de pessoa para obter todas as pessoas
      const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas); // Retorna a lista de todas as pessoas em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para cancelar o registro de um estudante e suas matrículas
  async cancelaRegistroEstudante (req, res) {
    const { estudante_id } = req.params; // Obtém o ID do estudante dos parâmetros da solicitação
    try {
      // Chama o método do serviço de pessoa para cancelar o registro do estudante e suas matrículas
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({ mensagem: `matrículas ref. estudante ${estudante_id} canceladas` }); // Retorna uma mensagem de sucesso com o ID do estudante em formato JSON com status 200
    } catch (erro) {
      return res.status(500).json({ erro: erro.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }
}

// Exporta a classe PessoaController
module.exports = PessoaController;
