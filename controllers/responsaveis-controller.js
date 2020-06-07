const pool = require('../postgresql');

exports.getResponsavel = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM responsavel');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getResponsavelById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM responsavel WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postResponsavel = async (req, res) => {
    try {
        const { 
            nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
            fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
            referencia, observacao, created_at, updated_at
        } = req.body;

        const response = await pool.query(`INSERT INTO responsavel 
        (
            nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
            fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
            referencia, observacao, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
            [ 
                nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
                fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
                referencia, observacao, new Date(), new Date()
            ]);
        res.json({
            message: 'Responsavel added Succesfully',
            body: {
                user: { 
                    nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
                    fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
                    referencia, observacao, created_at, updated_at
                 }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateResponsavel = async (req, res) => { 
    try {

        const id = req.params.id;
        const { 
            nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
            fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
            referencia, observacao, updated_at
        } = req.body;

        const response = await pool.query(`UPDATE responsavel SET 
            nome = $1, dt_nascimento = $2, cpf = $3, rg = $4, telefone_fixo = $5, telefone_movel = $6, telefone_comercial = $7,
            fk_profissao = $8, email = $9, cep = $10, logradouro = $11, numero = $12, complemento = $13, bairro = $14, estado = $15, 
            cidade = $16, referencia = $17, observacao = $18, updated_at = $19 WHERE id = $20`, 
        [ 
            nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
            fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
            referencia, observacao, new Date(), id ]);
        
        res.json({
            message: 'Responsavel alterated Succesfully',
            body: {
                user: { 
                    nome, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel, telefone_comercial,
                    fk_profissao, email, cep, logradouro, numero, complemento, bairro, estado, cidade,
                    referencia, observacao, updated_at
                 }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteResponsavel = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM responsavel WHERE id = $1', [id]);
        res.json(`Responsavel ${id} deleted successfully`);   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};