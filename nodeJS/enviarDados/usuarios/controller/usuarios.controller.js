const enviarCadastroUsuarioParaBanco = require('../services/cadastroUsuarios.service.js')

const express = require('express')

const rota = express.Router()
rota.post('/cadastrarUsuario', enviarCadastroUsuarioParaBanco)

module.exports = rota