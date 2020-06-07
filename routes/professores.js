const { Router } = require('express');
const router = Router();

const professoresController = require('../controllers/professores-controller'); 

router.get('/', professoresController.getProfessor);
router.get('/:id', professoresController.getProfessorById);
router.post('/', professoresController.postProfessor);
router.put('/:id', professoresController.updateProfessor);
router.delete('/:id', professoresController.deleteProfessor);
router.post('/login/:email', professoresController.login);

module.exports = router;