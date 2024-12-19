const verificarCpfNoBanco = require('../services/verificarCPF.service');

const verificarCpfMiddleware = async (req, res, next) => {
    const { cpf } = req.body;

    if (!cpf) {
        return res.status(400).json({ sucesso: false, mensagem: 'CPF é obrigatório!' });
    }

    try {
        // Verificar o CPF usando o service
        const usuario = await verificarCpfNoBanco(cpf);

        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'CPF não encontrado!' });
        }

        // Adicionar o usuário encontrado à requisição
        req.usuario = usuario;
        next();
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor' });
    }
};

module.exports = verificarCpfMiddleware;
