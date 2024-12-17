const senhaCriptografada = require('../middleware/criptografarSenha.js')
const enviarCadastroUsuarioParaBanco = require('../services/cadastroUsuarios.service.js')
const verificarLogin = require('../services/verificarLogin.service.js')

const express = require('express')
const rota = express.Router()

// Rota para cadastrar usuário
rota.post('/cadastrarUsuario', senhaCriptografada, enviarCadastroUsuarioParaBanco)

// Rota para login
rota.post('/login', verificarLogin);

module.exports = rota