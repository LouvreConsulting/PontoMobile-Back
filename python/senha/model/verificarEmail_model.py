# Verifica se o email informado existe dentro do banco de dados

# Definindo o que eu quero
comandoSQL = 'SELECT COUNT(*) FROM usuarios_schema.usuarios WHERE email = %s'