// Importa a função Router do Express para definir rotas.
const { Router } = require('express');

// Importa o controller que lida com a lógica de negócio relacionada aos cursos.
const CursoController = require('../controllers/CursoController.js');

// Cria uma instância do controller de curso.
const cursoController = new CursoController();

// Cria um novo objeto Router para definir as rotas.
const router = Router();

// Define as rotas utilizando os métodos HTTP e os métodos do controller correspondentes.
router.get('/cursos', (req, res) => cursoController.pegaCursos(req, res));
// Rota para listar todos os cursos.

router.get('/cursos/:id', (req, res) => cursoController.pegaUmPorId(req, res));
// Rota para buscar um curso por ID.

router.post('/cursos', (req, res) => cursoController.criaNovo(req, res));
// Rota para criar um novo curso.

router.put('/cursos/:id', (req, res) => cursoController.atualiza(req, res));
// Rota para atualizar um curso existente por ID.

router.delete('/cursos/:id', (req, res) => cursoController.exclui(req, res));
// Rota para excluir um curso por ID.

// Exporta o objeto Router com as rotas definidas.
module.exports = router;
