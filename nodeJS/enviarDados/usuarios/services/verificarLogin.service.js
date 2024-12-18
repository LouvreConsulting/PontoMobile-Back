const bcrypt = require('bcrypt');
const verificarCpfNoBanco = require('./verificarCPF.service');

const verificarLogin = async (req, res) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'CPF e senha são obrigatórios' });
    }

    try {
        // Verificar se o CPF existe no banco
        const usuario = await verificarCpfNoBanco(cpf);

        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'CPF não encontrado' });
        }

        // Comparando a senha fornecida com o hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta' });
        }

        // Retornando sucesso se as credenciais forem válidas
        return res.status(200).json({ sucesso: true, mensagem: 'Login bem-sucedido', usuario: { cpf: usuario.cpf } });
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor' });
    }
};

module.exports = verificarLogin;