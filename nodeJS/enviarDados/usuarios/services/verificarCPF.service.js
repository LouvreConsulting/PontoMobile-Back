const banco = require('../../config');

const verificarCpfNoBanco = async (cpf) => {
    try {
        // Garantir que o CPF seja uma string
        if (typeof cpf !== 'string') {
            cpf = String(cpf);
        }

        // Remover pontos e hífens do CPF fornecido
        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '');

        // Consultando o banco de dados para verificar se o CPF existe
        const query = 'SELECT * FROM usuarios_schema.usuarios WHERE REPLACE(REPLACE(cpf, \'.\', \'\'), \'-\', \'\') = $1';
        const { rows } = await banco.query(query, [cpfSemFormatacao]);

        // Retornar o usuário encontrado ou null se não existir
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erro ao verificar CPF no banco:', error);
        throw new Error('Erro ao acessar o banco de dados');
    }
}

module.exports = verificarCpfNoBanco;