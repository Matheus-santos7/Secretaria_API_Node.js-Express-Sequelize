const { Op } = require('sequelize');

const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }
  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    // const where = {
    //   data_inicio:{
    //     [Op.gte]: data_inicial,
    //     [Op.lte]: data_final
    //   }
    //};

    //se existirem os parametros data_inicial e data_final, criar um prop {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    // se existir data_inicial, adicionar a propriedade gte ao where.data_inicio
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    // se existir data_final, adicionar a propriedade lte ao where.data_inicio
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCurso = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCurso);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CursoController;
