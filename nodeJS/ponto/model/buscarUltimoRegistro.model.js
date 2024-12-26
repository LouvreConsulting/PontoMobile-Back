const banco = require('../../config.js');

const buscarUltimoPonto = async (cpf) => {
  const query = `
    SELECT data_hora
    FROM usuarios_schema.pontos_batidos
    WHERE cpf = $1
    ORDER BY data_hora DESC
    LIMIT 1
  `;

  try {
    const { rows } = await banco.query(query, [cpf]);
    return rows[0] ? rows[0].data_hora : null;
  } catch (error) {
    throw new Error('Erro ao buscar o último registro de ponto: ' + error.message)
  }
}

module.exports = { buscarUltimoPonto }