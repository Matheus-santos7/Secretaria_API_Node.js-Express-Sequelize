// Importa a classe genérica 'Services' que fornece operações básicas de CRUD.
const Services = require('./Services.js');

// Define a classe 'CursoServices', que estende a classe 'Services'.
class CursoServices extends Services {
  // O construtor chama o construtor da classe pai 'Services' com o nome do modelo 'Curso'.
  constructor() {
    super('Curso');
  }
}

// Exporta a classe 'CursoServices', permitindo que seja utilizada em outros arquivos.
module.exports = CursoServices;
