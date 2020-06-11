const pool = require('../postgresql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

exports.getProfessor = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM professor');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getProfessorById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM professor WHERE id = $1', [id]);
        res.json(response.rows);
        console.log(response);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postProfessor = async (req, res) => {
    try {
        const { nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
            status, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);

        const response = await pool.query(`INSERT INTO professor 
        (nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
            status, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`,
            [ nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
                status, email, hash, cep, logradouro, numero, complemento,
                bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente, new Date(), new Date()]);
        res.json({
            message: 'Professor added Succesfully',
            body: {
                user: { 
                    nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
            status, email, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateProfessor = async (req, res) => { 
    try {
        const id = req.params.id;
        const { 
            nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
            status, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente, created_at
        } = req.body;

        const response = await pool.query(`UPDATE professor SET 
            nome = $1, fk_disciplina =  $2, dt_nascimento = $3, cpf = $4, rg = $5, telefone_fixo = $6, telefone_movel = $7,
            status = $8, email = $9, senha = $10, cep = $11, logradouro = $12, numero = $13, complemento = $14,
            bairro = $15, estado = $16, cidade = $17, referencia = $18, observacao = $19, valor_hora = $20, banco = $21, agencia = $22, 
            conta_corrente = $23, updated_at = $24 WHERE id = $25`, 
        [
            nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
            status, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente, new Date(), id
        ]);
        
        res.json({
            message: 'Aluno alterated Succesfully',
            body: {
                user: { 
                    nome, fk_disciplina, dt_nascimento, cpf, rg, telefone_fixo, telefone_movel,
                    status, email, senha, cep, logradouro, numero, complemento,
                    bairro, estado, cidade, referencia, observacao, valor_hora, banco, agencia, conta_corrente, created_at, updated_at                 }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteProfessor = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM professor WHERE id = $1', [id]);
        res.json(`Professor ${id} deleted successfully`);   
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const response = await pool.query('SELECT id, nome, email, senha FROM professor WHERE email = $1', [req.body.email]);
console.log(response.rows);
        if (response.rows == '') {
            return res.status(400).send({ mensagem: 'Usuário ou senha incorretos' });
        }
        if (bcrypt.compareSync(req.body.senha, response.rows[0].senha)) {
            
            const user = response.rows;
            user.senha = undefined;   ///CORRIGIR
            res.send({ 
                user, 
                token : generateToken({ id: user.id}) 
            });
        } else {
            return res.status(400).send({ mensagem: 'Falha na autenticação' });
        }

    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

function generateToken(params = {}){
    return jwt.sign({ params }, authConfig.secret_professor, {
        expiresIn: 86400, //1 dia 
    });
}