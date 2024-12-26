const express = require('express');
const router = express.Router();
const enviarPontoParaBanco = require('../services/ponto.service.js')
const { obterUltimoPonto } = require('../services/buscarUltimoRegistro.service.js')

// Função para enviar o ponto ao banco de dados
router.post('/enviar-ponto', async (req, res) => {
    const { nome, cpf, timestamp } = req.body;

    if (!nome || !cpf) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    try {
        const resposta = await enviarPontoParaBanco(nome, cpf); // Chamando a service
        return res.status(200).json(resposta); // Retornando a resposta da service
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Rota para obter o último ponto registrado
router.post('/ultimo-ponto/:cpf', async (req, res) => {
    const { cpf } = req.params
    console.log('CPF recebido:', cpf)
  
    try {
      const ultimoPonto = await obterUltimoPonto(cpf);
      return res.status(200).json({ ultimoPonto });
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  })

module.exports = router