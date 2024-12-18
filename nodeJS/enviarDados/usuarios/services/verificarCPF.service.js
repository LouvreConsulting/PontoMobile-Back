const banco = require('../../config');

const verificarCpfNoBanco = async (cpf) => {
    if (!cpf) {
        throw new Error('CPF é obrigatório!');
    }

    try {
        // Garantir que o CPF seja uma string e remover a formatação
        const cpfSemFormatacao = String(cpf).replace(/[^\d]+/g, '');

        // Consultar o banco de dados
        const query = 'SELECT * FROM usuarios_schema.usuarios WHERE REPLACE(REPLACE(cpf, \'.\', \'\'), \'-\', \'\') = $1';
        const { rows } = await banco.query(query, [cpfSemFormatacao]);

        // Retornar o usuário encontrado ou null se não existir
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erro ao verificar CPF no banco:', error);
        throw new Error('Erro ao acessar o banco de dados');
    }
};

module.exports = verificarCpfNoBanco;