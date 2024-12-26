const banco = require('../../config.js')

const enviarPontoParaBanco = async (nome, cpf, latitude, longitude) => {
    try {

        const cpfSemFormatacao = cpf.replace(/[^\d]+/g, '')
        console.log(cpfSemFormatacao)

        const dataEHora = new Date()
        const dataBrasil = dataEHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
        console.log(`Ponto batido para usuário: ${cpf} no horário ${dataBrasil}`)

        if (cpfSemFormatacao.length !== 11) {
            throw new Error('CPF inválido');
        }

        if (!latitude || !longitude) {
            throw new Error('Coordenadas inválidas!')
        }

        const query = `INSERT INTO usuarios_schema.pontos_batidos (nome, cpf, data_hora, localizacao)
                       VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))`
                       
        const values = [nome, cpfSemFormatacao, dataBrasil, longitude, latitude]

        await banco.query(query, values)
        return { message: 'Ponto registrado com sucesso' }
    } catch (error) {
        console.error('Erro ao registrar ponto:', error)
        throw new Error('Erro ao registrar ponto')
    }
}

module.exports = enviarPontoParaBanco