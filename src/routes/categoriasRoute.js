// Importa a função Router do Express para definir rotas.
const { Router } = require('express');

// Importa o controller que lida com a lógica de negócio relacionada às categorias.
const CategoriaController = require('../controllers/CategoriaController.js');

// Cria uma instância do controller de categoria.
const categoriaController = new CategoriaController();

// Cria um novo objeto Router para definir as rotas.
const router = Router();

// Define as rotas utilizando os métodos HTTP e os métodos do controller correspondentes.
router.get('/categorias', (req, res) => categoriaController.pegaTodos(req, res));
// Rota para listar todas as categorias.

router.get('/categorias/:id', (req, res) => categoriaController.pegaUmPorId(req, res));
// Rota para buscar uma categoria por ID.

router.post('/categorias', (req, res) => categoriaController.criaNovo(req, res));
// Rota para criar uma nova categoria.

router.put('/categorias/:id', (req, res) => categoriaController.atualiza(req, res));
// Rota para atualizar uma categoria existente por ID.

router.delete('/categorias/:id', (req, res) => categoriaController.exclui(req, res));
// Rota para excluir uma categoria por ID.

// Exporta o objeto Router com as rotas definidas.
module.exports = router;
