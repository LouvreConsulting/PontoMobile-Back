const banco = require('../../config.js')

const enviarPontoParaBanco = async (nome, cpf) => {
    try {

        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '')
        console.log(cpfSemFormatacao);

        const dataEHora = new Date()
        const dataBrasil = dataEHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        console.log(`Ponto batido para usuário: ${cpf} no horário ${dataBrasil}`)

        if (cpfSemFormatacao.length !== 11) {
            throw new Error('CPF inválido');
        }

        const query = 'INSERT INTO usuarios_schema.pontos_batidos (nome, cpf, data_hora) VALUES ($1, $2, $3)'
        const values = [nome, cpfSemFormatacao, dataBrasil]

        await banco.query(query, values)
        return { message: 'Ponto registrado com sucesso' }
    } catch (error) {
        console.error('Erro ao registrar ponto:', error)
        throw new Error('Erro ao registrar ponto')
    }
}

module.exports = enviarPontoParaBanco
