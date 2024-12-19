const bcrypt = require('bcrypt');

const verificarLogin = async (req, res) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'Senha é obrigatória!' });
    }

    try {
        // O usuário já foi verificado e está disponível no req.usuario
        const usuario = req.usuario;

        // Comparar a senha fornecida com o hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta!' });
        }

        // Retornar sucesso se as credenciais forem válidas
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Login bem-sucedido',
            usuario: { cpf: usuario.cpf },
        });
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor' });
    }
};

module.exports = verificarLogin;