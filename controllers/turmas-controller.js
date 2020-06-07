const pool = require('../postgresql');

exports.getTurma = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM turma');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getTurmaById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM turma WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postTurma = async (req, res) => {
    try {
        const { fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, created_at, updated_at } = req.body;

        const response = await pool.query(`INSERT INTO turma 
        (fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [ fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, new Date(), new Date()]);
        res.json({
            message: 'Turma added Succesfully',
            body: {
                user: { fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, created_at, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateTurma = async (req, res) => { 
    try {
        const id = req.params.id;
        const { fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, created_at, updated_at } = req.body;

        const response = await pool.query(`UPDATE turma SET 
            fk_professor = $1, fk_disciplina = $2, dt_inicio = $3, 
            dt_final = $4, carga_horaria = $5, updated_at = $6 WHERE id = $7`, 
        [ fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, new Date() ,id ]);
        
        res.json({
            message: 'Turma alterated Succesfully',
            body: {
                user: { fk_professor, fk_disciplina, dt_inicio, dt_final, carga_horaria, created_at, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteTurma = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM turma WHERE id = $1', [id]);
        res.json(`Turma ${id} deleted successfully`);   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};