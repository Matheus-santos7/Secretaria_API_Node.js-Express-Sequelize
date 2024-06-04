// Importa a classe Controller
const Controller = require('./Controller.js');

// Importa o serviço MatriculaServices
const MatriculaServices = require('../services/MatriculaServices.js');

// Cria uma instância de MatriculaServices
const matriculaServices = new MatriculaServices();

// Define a classe MatriculaController, que estende a classe Controller
class MatriculaController extends Controller {
  
  // Construtor da classe MatriculaController
  constructor() {
    super(matriculaServices); // Chama o construtor da classe pai (Controller) passando o serviço MatriculaServices como parâmetro
  }

  // Método assíncrono para obter matrículas confirmadas de um estudante
  async pegaMatriculaPorEstudante(req, res) {
    const { estudante_id } = req.params; // Obtém o ID do estudante dos parâmetros da solicitação

    try {
      // Chama o método do serviço de matrícula para obter e contar as matrículas confirmadas do estudante
      const listaMatriculaPorEstudante = await matriculaServices.pegaEcontaRegistros({
        where : {
          estudante_id: Number(estudante_id), // Converte o ID do estudante para número
          status: 'confirmado' // Define a condição de busca para matrículas confirmadas
        },
        limit : 2, // Define o limite de registros retornados
        order : [['id', 'DESC']] // Define a ordem de retorno dos registros
      });
    
      return res.status(200).json(listaMatriculaPorEstudante); // Retorna a lista de matrículas por estudante em formato JSON com status 200

    } catch (error) {
      return res.status(500).json({ message: error.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

  // Método assíncrono para obter cursos com todas as vagas lotadas
  async pegaCursosLotado (req, res) {
    try {
      // Chama o método do serviço de matrícula para obter e contar os cursos com todas as vagas lotadas
      const cursosLotados = await matriculaServices.pegaEcontaRegistros({
        where : {
          status: 'confirmado' // Define a condição de busca para matrículas confirmadas
        },
        attributes: ['curso_id'], // Especifica os atributos a serem incluídos no resultado
        group: ['curso_id'] // Agrupa os resultados pelo ID do curso
      });
    
      return res.status(200).json(cursosLotados); // Retorna a lista de cursos lotados em formato JSON com status 200

    } catch (error) {
      return res.status(500).json({ message: error.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }

}

// Exporta a classe MatriculaController
module.exports = MatriculaController;
