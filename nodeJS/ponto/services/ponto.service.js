const banco = require('../../config.js');

const enviarPontoParaBanco = async (nome, cpf) => {
    try {

        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '');
        console.log(cpfSemFormatacao);

        if (cpfSemFormatacao.length !== 11) {
            throw new Error('CPF inválido');
        }

        const query = 'INSERT INTO usuarios_schema.pontos_batidos (nome, cpf) VALUES ($1, $2)';
        const values = [nome, cpfSemFormatacao];

        await banco.query(query, values);
        return { message: 'Ponto registrado com sucesso' };
    } catch (error) {
        console.error('Erro ao registrar ponto:', error);
        throw new Error('Erro ao registrar ponto');
    }
};

module.exports = enviarPontoParaBanco;
