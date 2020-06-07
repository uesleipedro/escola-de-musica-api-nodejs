const pool = require('../postgresql');

exports.getDisciplina = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM disciplina');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getDisciplinaById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM disciplina WHERE id = $1', [id]);
        res.json(response.rows);
        console.log(response);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postDisciplina = async (req, res) => {
    try {
        const { disciplina, valor, created_at, updated_at } = req.body;

     

        const response = await pool.query(`INSERT INTO disciplina 
        (disciplina, valor, created_at, updated_at) VALUES ($1, $2, $3, $4)`,
            [ disciplina, valor, new Date(), new Date()]);
        res.json({
            message: 'Disciplina added Succesfully',
            body: {
                user: { disciplina, valor, created_at, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateDisciplina = async (req, res) => { 
    try {
        const id = req.params.id;
        const { disciplina, valor, updated_at } = req.body;

        const response = await pool.query(`UPDATE disciplina SET 
                disciplina = $1, valor = $2, updated_at = $3 WHERE id = $4`, 
        [ disciplina, valor, new Date(), id ]);
        
        res.json({
            message: 'Disciplina alterated Succesfully',
            body: {
                user: { disciplina, valor, updated_at }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteDisciplina = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM disciplina WHERE id = $1', [id]);
        res.json(`Disciplina ${id} deleted successfully`);   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};