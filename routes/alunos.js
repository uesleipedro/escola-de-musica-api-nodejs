const { Router } = require('express');
const router = Router();

const alunosController = require('../controllers/alunos-controller'); 

router.get('/', alunosController.getAlunos);
router.get('/:id', alunosController.getAlunoById);
router.post('/', alunosController.postAluno);
router.put('/:id', alunosController.updateAluno);
router.delete('/:id', alunosController.deleteAluno);
router.post('/login/:email', alunosController.login);

module.exports = router;