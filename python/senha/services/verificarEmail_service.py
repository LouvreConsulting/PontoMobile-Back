import psycopg2
from python.senha.config import BANCO
from senha.model.verificarEmail_model import comandoSQL

# Função para verificar se o email está no banco de dados
def verificar_email(email):
    try:
        conn = psycopg2.connect(**BANCO)
        cursor = conn.cursor()
        query = comandoSQL
        cursor.execute(query, (email,))
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()
        return resultado[0] > 0  # Retorna True se o email existir
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return False