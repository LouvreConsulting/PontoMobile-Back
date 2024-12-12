const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')

const app = express()
const porta = 3000

// Middleware para processar o JSON
app.use(bodyParser.json())

// Configurações do pool para conexão com o banco
const banco = new Pool({
    user: 'myadmin',
    host: 'localhost',
    database: 'mypoint',
    password: 'Louvre@2024',
    port: 5432
})

// Rota para cadastrar usuário
app.post('/cadastrarUsuarios', async (req, res) => {
    const {nome_completo, cpf, data_nascimento, email, senha, empresa} = req.body

    function enviarCadastroUsuarioParaBanco() {
        try{
            const comandoParaCadastrarUsuarios = `
                INSERT INTO usuarios_schema.usuarios (nome_completo, cpf, data_nascimento, email, senha, empresa)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `

            const values = [nome_completo, cpf, data_nascimento, email, senha, empresa]
            const resultado = await banco.query(comandoParaCadastrarUsuarios, values)

            res.status(201).json({
                message: 'Usuário cadastrado com sucesso!',
                usuario: resultado.rows,
            })
            console.log('Sucesso!');
        } catch (error) {
            console.error('Erro ao inserir o usuário', error)
            res.status(500).json({
                message: 'Erro ao cadastrar usuário :('
            })
        }
    }
})

app.listen(porta, () => {
    console.log(`API rodando em: http://localhost:${porta}`);
})
