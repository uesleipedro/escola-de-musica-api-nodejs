const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware.aluno);

router.get('/', (req, res) => {
    res.send({ ok: true });
});

module.exports = router;