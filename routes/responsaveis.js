const { Router } = require('express');
const router = Router();

const responsaveisController = require('../controllers/responsaveis-controller'); 

router.get('/', responsaveisController.getResponsavel);
router.get('/:id', responsaveisController.getResponsavelById);
router.post('/', responsaveisController.postResponsavel);
router.put('/:id', responsaveisController.updateResponsavel);
router.delete('/:id', responsaveisController.deleteResponsavel);

module.exports = router;