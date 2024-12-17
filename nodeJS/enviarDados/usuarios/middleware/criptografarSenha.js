const bcrypt = require('bcrypt')

const senhaCriptografada = async (req, res, next) => {
    try {
        const { senha } = req.body

        if (!senha) {
            return res.status(400).json({ message: 'Senha é obrigatória' })
        }

        const saltos = 10 // Quantidade de saltos do bscypt
        const senhaHash = await bcrypt.hash(senha, saltos)

        // Substitui a senha original por um hash
        req.body.senha = senhaHash

        // Chama o próximo middleware ou controller
        next()
    } catch (error) {
        console.error('Erro ao criptografar senha: ', error)
        res.status(500).json({ message: 'Erro ao processar senha' })
    }
}

module.exports = senhaCriptografada