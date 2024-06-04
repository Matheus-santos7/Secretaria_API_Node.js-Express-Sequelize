const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculaPorEstudante(req, res) {
    const { estudante_id } = req.params;

    try {
      const listaMatriculaPorEstudante = await matriculaServices.pegaEcontaRegistros({
        where : {
          estudante_id: Number(estudante_id),
          status: 'confirmado'
        },
        limit : 2,
        order : [['id', 'DESC']]
      });
    
      return res.status(200).json(listaMatriculaPorEstudante);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async pegaCursosLotado (req, res) {
    try {
      const cursosLotados = await matriculaServices.pegaEcontaRegistros({
        where : {
          status: 'confirmado'
        },
        attributes: ['curso_id'],
        group: ['curso_id']
      });
    
      return res.status(200).json(cursosLotados);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

}

module.exports = MatriculaController;