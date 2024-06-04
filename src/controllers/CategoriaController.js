// Importa a classe Controller
const Controller = require('./Controller.js');

// Importa o serviço CategoriaServices
const CategoriaServices = require('../services/CategoriaServices.js');

// Cria uma instância de CategoriaServices
const categoriaServices = new CategoriaServices();

// Define a classe CategoriaController, que estende a classe Controller
class CategoriaController extends Controller {
  
  // Construtor da classe CategoriaController
  constructor() {
    super(categoriaServices); // Chama o construtor da classe pai (Controller) passando o serviço CategoriaServices como parâmetro
  }
}

// Exporta a classe CategoriaController
module.exports = CategoriaController;
