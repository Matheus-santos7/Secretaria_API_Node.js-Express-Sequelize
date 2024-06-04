// Importa o módulo 'dataSource' que contém os modelos do banco de dados.
const dataSource = require('../database/models');

// Importa a classe 'Services' que fornece operações básicas de CRUD para os modelos.
const Services = require('./Services.js');

// Define a classe 'PessoaServices', que estende a classe 'Services'.
class PessoaServices extends Services {
  // O construtor chama o construtor da classe pai 'Services' com o nome do modelo 'Pessoa'.
  constructor() {
    super('Pessoa');
    // Cria uma instância de 'Services' para o modelo 'Matricula' e armazena em 'this.matriculaServices'.
    this.matriculaServices = new Services('Matricula');
  }

  // Método assíncrono que retorna as matrículas ativas de um estudante pelo seu ID.
  async pegaMatriculasAtivasPorEstudante(id) {
    // Usa o método da classe pai para pegar um registro de 'Pessoa' pelo ID.
    const estudante = await super.pegaUmRegistroPorId(id);
    // Usa o método 'getAulasMatriculadas' do objeto estudante para pegar as matrículas ativas.
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  // Método assíncrono que retorna todas as matrículas de um estudante pelo seu ID.
  async pegaTodasAsMatriculasPorEstudante(id) {
    // Usa o método da classe pai para pegar um registro de 'Pessoa' pelo ID.
    const estudante = await super.pegaUmRegistroPorId(id);
    // Usa o método 'getTodasAsMatriculas' do objeto estudante para pegar todas as matrículas.
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  // Método assíncrono que retorna todas as pessoas utilizando um escopo específico.
  async pegaPessoasEscopoTodos () {
    // Usa o método da classe pai para pegar registros com o escopo 'todosOsRegistros'.
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  // Método assíncrono que cancela uma pessoa e suas matrículas em uma transação.
  async cancelaPessoaEMatriculas (estudanteId) {
    // Usa uma transação do Sequelize para garantir que as atualizações sejam atômicas.
    return dataSource.sequelize.transaction(async (transacao) => {
      // Atualiza o registro da pessoa para definir 'ativo' como false.
      await super.atualizaRegistro({ ativo: false }, { id: estudanteId }, transacao);
      // Atualiza os registros de matrícula para definir 'status' como 'cancelado'.
      await this.matriculaServices.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudanteId }, transacao);
    });
  }
}

// Exporta a classe 'PessoaServices', permitindo que seja utilizada em outros arquivos.
module.exports = PessoaServices;
