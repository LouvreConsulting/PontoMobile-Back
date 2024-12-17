const banco = require('../../config')
const bcrypt = require('bcrypt')

const verificarLogin = async (req, res) => {
    const { cpf, senha } = req.body

    if (!cpf || !senha) {
        return res.status(400).json({ sucesso: false, mensagem: 'CPF e senha são obrigatórios' })
    }

    try {
        // Remover pontos e hífens do CPF fornecido
        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '')

        // Consultando o banco de dados para verificar se o CPF e a senha existem
        const query = 'SELECT * FROM usuarios_schema.usuarios WHERE REPLACE(REPLACE(cpf, \'.\', \'\'), \'-\', \'\') = $1'
        const { rows } = await banco.query(query, [cpfSemFormatacao])

        // Se não encontrar o usuário
        if (rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'CPF não encontrado' })
        }

        // Verificando a senha (você pode aplicar um hash de senha aqui, caso necessário)
        const usuario = rows[0];

        // Log para verificar o valor da senha e o hash no banco
        console.log('Senha fornecida:', senha)
        console.log('Senha armazenada no banco:', usuario.senha)

        // Comparando a senha fornecida com o hash da senha armazenada no banco de dados
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta' });
        }

        // Retornando sucesso se as credenciais forem válidas
        return res.status(200).json({ sucesso: true, mensagem: 'Login bem-sucedido', usuario: { cpf: usuario.cpf } });

    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor' });
    }
}

module.exports = verificarLogin