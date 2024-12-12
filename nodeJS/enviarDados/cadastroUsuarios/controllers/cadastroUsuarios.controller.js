import { enviarCadastroUsuarioParaBanco } from '../services/cadastroUsuarios.service.js'

const express = require('express')

const rota = express.Router()
rota.post('/cadastrarUsuario', validarCamposUsuario ,enviarCadastroUsuarioParaBanco)

export default rota