// Importa o operador "Op" do Sequelize para usar operadores de comparação em consultas
const { Op } = require('sequelize');

// Importa a classe Controller
const Controller = require('./Controller.js');

// Importa o serviço CursoServices
const CursoServices = require('../services/CursoServices.js');

// Cria uma instância de CursoServices
const cursoServices = new CursoServices();

// Define a classe CursoController, que estende a classe Controller
class CursoController extends Controller {
  
  // Construtor da classe CursoController
  constructor() {
    super(cursoServices); // Chama o construtor da classe pai (Controller) passando o serviço CursoServices como parâmetro
  }
  
  // Método assíncrono para obter cursos com base nos parâmetros de consulta
  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query; // Obtém os parâmetros de consulta data_inicial e data_final da solicitação
    const where = {}; // Inicializa um objeto onde serão definidas as condições de busca

    // Verifica se os parâmetros de consulta data_inicial e data_final existem
    if (data_inicial || data_final) {
      where.data_inicio = {}; // Inicializa um objeto dentro de where para armazenar as condições de busca para data_inicio
    }

    // Adiciona a condição de busca gte (greater than or equal) se data_inicial existir
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;

    // Adiciona a condição de busca lte (less than or equal) se data_final existir
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      // Chama o método do serviço de curso para obter cursos com base nas condições de busca definidas em where
      const listaCurso = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCurso); // Retorna a lista de cursos em formato JSON com status 200
    } catch (error) {
      return res.status(500).json({ message: error.message }); // Retorna um erro interno do servidor com a mensagem de erro se ocorrer um erro durante a execução
    }
  }
}

// Exporta a classe CursoController
module.exports = CursoController;
