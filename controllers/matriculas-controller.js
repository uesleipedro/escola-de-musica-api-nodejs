const pool = require('../postgresql');

exports.getMatricula = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM matricula');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getMatriculaById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM matricula WHERE id = $1', [id]);
        res.json(response.rows);
        console.log(response);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postMatricula = async (req, res) => {
    try {
        const { fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, created_at, updated_at } = req.body;

        const response = await pool.query(`INSERT INTO matricula 
            ( fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, created_at, updated_at ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [ fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, new Date(), new Date() ]);
        res.json({
            message: 'Matricula added Succesfully',
            body: {
                user: { fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, created_at, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateMatricula = async (req, res) => { 
    try {

        const id = req.params.id;
        const { fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, updated_at } = req.body;

        const response = await pool.query(`UPDATE matricula SET 
            fk_id_aluno = $1, fk_id_turma = $2, dt_matricula = $3, valor_curso = $4, desconto = $5, status = $6, updated_at = $7 WHERE id = $8`, 
        [ fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, new Date(), id ]);
        
        res.json({
            message: 'Matricula alterated Succesfully',
            body: {
                user: { fk_id_aluno, fk_id_turma, dt_matricula, valor_curso, desconto, status, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteMatricula = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM matricula WHERE id = $1', [id]);
        res.json(`Matricula ${id} deleted successfully`);   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};