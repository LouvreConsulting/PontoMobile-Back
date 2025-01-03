const { Pool } = require('pg')
require('dotenv').config()

const banco = new Pool({
    user: 'postgres',
    host: 'summarily-spotless-yeti.data-1.use1.tembo.io',
    database: 'mypoint',
    password: 'FcUJNaY6ZaSwWreO',
    port: '5432',
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
})

module.exports = banco