const comandoParaCadastrarUsuarios = `
INSERT INTO usuarios_schema.usuarios (nome_completo, cpf, data_nascimento, email, senha, empresa)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
`
module.exports = comandoParaCadastrarUsuarios