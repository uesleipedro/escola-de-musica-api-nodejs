const pool = require('../postgresql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

exports.getAlunos = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM aluno');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM aluno WHERE id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.postAluno = async (req, res) => {
    try {

        const { nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
            status, fk_profissao, origem_contato, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, fk_responsavel, created_at, updated_at } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha, salt);

        const response = await pool.query(`INSERT INTO aluno 
        (nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
            status, fk_profissao, origem_contato, email, senha, cep, logradouro, numero, complemento, 
            bairro, estado, cidade, referencia, observacao, fk_responsavel, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26 )`,
            [nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
                status, fk_profissao, origem_contato, email, hash, cep, logradouro, numero, complemento,
                bairro, estado, cidade, referencia, observacao, fk_responsavel, new Date(), new Date()]);
                const token = generateToken({ id: req.id});
            res.json({
            message: 'Aluno added Succesfully',
            body: {
                user: {
                    nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
                    status, fk_profissao, origem_contato, email, cep, logradouro, numero, complemento,
                    bairro, estado, cidade, referencia, observacao, fk_responsavel, created_at, updated_at
                }, token
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};

exports.updateAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
            status, fk_profissao, origem_contato, email, senha, cep, logradouro, numero, complemento,
            bairro, estado, cidade, referencia, observacao, fk_responsavel
        } = req.body;


        const updated_at = new Date();

        const response = await pool.query(`UPDATE aluno SET 
            nome = $1, matricula = $2, dt_nascimento = $3, cpf = $4, rg = $5, sexo = $6, telefone_fixo = $7, telefone_movel = $8, telefone_comercial = $9,
            status = $10, fk_profissao = $11, origem_contato = $12, email = $13, senha = $14, cep = $15, logradouro = $16, numero = $17, complemento = $18, 
            bairro = $19, estado = $20, cidade = $21, referencia = $22, observacao = $23, fk_responsavel = $24, updated_at = $25 WHERE id = $26`,
            [
                nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
                status, fk_profissao, origem_contato, email, senha, cep, logradouro, numero, complemento,
                bairro, estado, cidade, referencia, observacao, fk_responsavel, new Date(), id
            ]);

        res.json({
            message: 'Aluno alterated Succesfully',
            body: {
                user: {
                    nome, matricula, dt_nascimento, cpf, rg, sexo, telefone_fixo, telefone_movel, telefone_comercial,
                    status, fk_profissao, origem_contato, email, senha, cep, logradouro, numero, complemento,
                    bairro, estado, cidade, referencia, observacao, fk_responsavel, updated_at
                }
            }
        });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }

};

exports.deleteAluno = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM aluno WHERE id = $1', [id]);
        res.json(`Aluno ${id} deleted successfully`);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const response = await pool.query('SELECT id, nome, email, senha FROM aluno WHERE email = $1', [req.body.email]);

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
    return jwt.sign({ params }, authConfig.secret_aluno, {
        expiresIn: 86400, //1 dia 
    });
}