// Importa a classe genérica 'Services' que fornece operações básicas de CRUD.
const Services = require('./Services.js');

// Define a classe 'CategoriaServices', que estende a classe 'Services'.
class CategoriaServices extends Services {
  // O construtor chama o construtor da classe pai 'Services' com o nome do modelo 'Categoria'.
  constructor() {
    super('Categoria');
  }
}

// Exporta a classe 'CategoriaServices', permitindo que seja utilizada em outros arquivos.
module.exports = CategoriaServices;
