const { Pool } = require('pg')

const banco = new Pool({
    user: 'myadmin',
    host: 'localhost',
    database: 'mypoint',
    password: 'Louvre@2024',
    port: 5432
})

module.exports = banco