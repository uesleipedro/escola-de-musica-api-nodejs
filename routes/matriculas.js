const { Router } = require('express');
const router = Router();

const matriculasController = require('../controllers/matriculas-controller'); 

router.get('/', matriculasController.getMatricula);
router.get('/:id', matriculasController.getMatriculaById);
router.post('/', matriculasController.postMatricula);
router.put('/:id', matriculasController.updateMatricula);
router.delete('/:id', matriculasController.deleteMatricula);

module.exports = router;