const comandoParaCadastrarUsuarios = require ('../model/cadastroUsuarios.model.js')
const banco = require ('../../config.js')

async function enviarCadastroUsuarioParaBanco(req, res) {

    const {nome_completo, cpf, data_nascimento, email, senha, empresa} = req.body

    try{
        const values = [nome_completo, cpf, data_nascimento, email, senha, empresa]
        const resultado = await banco.query(comandoParaCadastrarUsuarios, values)

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            usuario: resultado.rows,
        })
        console.log('Sucesso!');
    } catch (error) {
        console.error('Erro ao inserir o usuário', error)
        res.status(500).json({
            message: 'Erro ao cadastrar usuário :('
        })
    }
}

module.exports = enviarCadastroUsuarioParaBanco