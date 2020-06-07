const { Router } = require('express');
const router = Router();

const turmasController = require('../controllers/turmas-controller'); 

router.get('/', turmasController.getTurma);
router.get('/:id', turmasController.getTurmaById);
router.post('/', turmasController.postTurma);
router.put('/:id', turmasController.updateTurma);
router.delete('/:id', turmasController.deleteTurma);

module.exports = router;