const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'joiodotrigo',
    database: 'emusic',
    post: '5432'
});

module.exports = pool;