const { buscarUltimoPonto } = require('../model/buscarUltimoRegistro.model.js');

const obterUltimoPonto = async (cpf) => {
  if (!cpf) {
    throw new Error('CPF não fornecido')
  }

  const ultimoPonto = await buscarUltimoPonto(cpf)

  if (!ultimoPonto) {
    throw new Error('Nenhum registro de ponto encontrado para este CPF')
  }

  return ultimoPonto;
}

module.exports = { obterUltimoPonto }