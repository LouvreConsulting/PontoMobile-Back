const senhaCriptografada = require('../middleware/criptografarSenha.middleware.js')
const verificarCpfMiddleware = require('../middleware/verificarCPF.middleware.js')
const enviarCadastroUsuarioParaBanco = require('../services/cadastroUsuarios.service.js')
const verificarCpfNoBanco = require('../services/verificarCPF.service.js')
const verificarLogin = require('../services/verificarLogin.service.js')

const express = require('express')
const rota = express.Router()

// Rota para cadastrar usuário
rota.post('/cadastrarUsuario', senhaCriptografada, enviarCadastroUsuarioParaBanco)

// Rota para login
rota.post('/login', verificarCpfMiddleware, verificarLogin);

// Rota para verificar CPF
rota.post('/verificarCPF', async (req, res) => {
    const { cpf } = req.body; // Pegando o CPF do body

    if (!cpf) {
        return res.status(400).json({ sucesso: false, mensagem: 'CPF é obrigatório!' });
    }

    try {
        const usuario = await verificarCpfNoBanco(cpf); // Retorna o usuário do banco
        
        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'CPF não encontrado' });
        }

        // Retorna o usuário encontrado com as informações necessárias
        return res.status(200).json({
            sucesso: true,
            usuario: {
                nome_completo: usuario.nome_completo,
                cpf: usuario.cpf,
            },
        });
    } catch (error) {
        console.error('Erro ao verificar CPF na rota:', error.message);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao verificar CPF' });
    }
})

module.exports = rota