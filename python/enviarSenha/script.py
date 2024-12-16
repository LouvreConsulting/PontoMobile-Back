import random
import string
from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2

app = Flask(__name__)

# Configurações do email de envio
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "computadordoquarto3@gmail.com"
EMAIL_PASSWORD = 'jemr mhhd qanp aowh'

# Configurações do banco de dados PostgreSQL
DB_CONFIG = {
    "user": "myadmin",
    "password": "Louvre@2024",
    "host": "localhost",
    "port": 5432,
    "database": "mypoint",
}

# Função para gerar uma nova senha aleatória
def gerar_senha():
    caracteres = string.ascii_letters + string.digits + "!@#$%^&*()"
    return "".join(random.choices(caracteres, k=10))

# Função para verificar se o email está no banco de dados
def verificar_email(email):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        query = "SELECT COUNT(*) FROM usuarios_schema.usuarios WHERE email = %s"
        cursor.execute(query, (email,))
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()
        return resultado[0] > 0  # Retorna True se o email existir
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return False

# Endpoint para enviar a nova senha
@app.route("/enviar-senha", methods=["POST"])
def enviar_senha():
    try:
        # Recebe o email do corpo da requisição
        dados = request.get_json()
        email_destino = dados.get("email")
        
        if not email_destino:
            return jsonify({"erro": "O campo 'email' é obrigatório"}), 400

        # Verifica se o email está no banco de dados
        if not verificar_email(email_destino):
            return jsonify({"erro": "Email não cadastrado"}), 404

        # Gera uma nova senha
        nova_senha = gerar_senha()

        # Monta a mensagem do email
        mensagem = MIMEMultipart()
        mensagem["From"] = EMAIL_ADDRESS
        mensagem["To"] = email_destino
        mensagem["Subject"] = "Sua nova senha"
        mensagem.attach(MIMEText(f"Sua nova senha é: {nova_senha}", "plain"))

        # Envia o email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as servidor:
            servidor.starttls()  # Ativa a criptografia
            servidor.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            servidor.sendmail(EMAIL_ADDRESS, email_destino, mensagem.as_string())

        return jsonify({"mensagem": "Senha enviada com sucesso!", "nova_senha": nova_senha}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao enviar o email: {str(e)}"}), 500

# Executa a aplicação
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5003)