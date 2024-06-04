// Importa a função Router do Express para definir rotas.
const { Router } = require('express');

// Importa os controllers que lidam com a lógica de negócio relacionada às pessoas e matrículas.
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

// Cria instâncias dos controllers.
const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

// Cria um novo objeto Router para definir as rotas.
const router = Router();

// Define as rotas utilizando os métodos HTTP e os métodos dos controllers correspondentes.
router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.cancelaRegistroPorEstudante(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.pegaMatriculaPorEstudante(req, res));
router.get('/pessoas/matriculas/lotadas', (req, res) => matriculaController.pegaCursosLotado(req, res));
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.pegaUm(req, res));
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.criaNovo(req, res));
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.atualiza(req, res));
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.exclui(req, res));

// Exporta o objeto Router com as rotas definidas.
module.exports = router;
