const express = require('express')
const bodyParser = require('body-parser')
const controllerUsuario = require('./controller/usuarios.controller.js')

const app = express()
const porta = 3000

// Middleware para processar o JSON
app.use(bodyParser.json())

// Rota para cadastrar usuário
app.use(controllerUsuario)

app.listen(porta, () => {
    console.log(`API rodando em: http://localhost:${porta}`);
})