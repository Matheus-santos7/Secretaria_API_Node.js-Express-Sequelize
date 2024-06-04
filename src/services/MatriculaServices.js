// Importa a classe genérica 'Services' que fornece operações básicas de CRUD.
const Services = require('./Services.js');

// Define a classe 'MatriculaServices', que estende a classe 'Services'.
class MatriculaServices extends Services {
  // O construtor chama o construtor da classe pai 'Services' com o nome do modelo 'Matricula'.
  constructor() {
    super('Matricula');
  }
}

// Exporta a classe 'MatriculaServices', permitindo que seja utilizada em outros arquivos.
module.exports = MatriculaServices;
