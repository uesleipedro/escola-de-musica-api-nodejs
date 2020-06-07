const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaAlunos = require('./routes/alunos');
const rotaProfessores = require('./routes/professores');
const rotaDisciplinas = require('./routes/disciplinas');
const rotaTurmas = require('./routes/turmas');
const rotaResponsaveis = require('./routes/responsaveis');
const rotaMatriculas = require('./routes/matriculas');
const rotaProject = require('./routes/project');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // '*' significa que aceita todos servidores acessando-o
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methos', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
        }

        next();
});

app.use('/alunos', rotaAlunos);
app.use('/professores', rotaProfessores);
app.use('/disciplinas', rotaDisciplinas);
app.use('/turmas', rotaTurmas);
app.use('/responsaveis', rotaResponsaveis);
app.use('/matriculas', rotaMatriculas);
app.use('/project', rotaProject);

// Acessa quando nenhuma rota é encontrada
app.use((req, res, next) => {
    const erro = new Error('Nenhuma rota encontrada (emusic)');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


module.exports = app;