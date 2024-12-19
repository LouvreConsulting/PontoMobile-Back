const express = require('express')
const bodyParser = require('body-parser')
const controllerUsuario = require('./usuarios/controller/usuarios.controller.js')
const controllerPonto = require('./ponto/controller/ponto.controller.js')

const app = express()
const porta = 3000

// Middleware para processar o JSON
app.use(bodyParser.json())

// Rota para cadastrar usuário
app.use(controllerUsuario)

// Rota para registrar ponto
app.use(controllerPonto)

app.listen(porta, () => {
    console.log(`API rodando em: http://localhost:${porta}`);
})