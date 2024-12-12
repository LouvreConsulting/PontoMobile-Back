const bodyParser = require('body-parser')
const { Pool } = require('pg')

export async function enviarCadastroUsuarioParaBanco(req, res) {

    const {nome_completo, cpf, data_nascimento, email, senha, empresa} = req.body

    try{
        const comandoParaCadastrarUsuarios = `
            INSERT INTO usuarios_schema.usuarios (nome_completo, cpf, data_nascimento, email, senha, empresa)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `

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