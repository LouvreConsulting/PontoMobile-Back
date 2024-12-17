import smtplib
from flask import request, jsonify
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from middleware.gerarSenha import gerar_senha
from .verificarEmail_service import verificar_email
from config import SMTP_SERVER, SMTP_PORTA, EMAIL_QUE_VAI_ENVIAR, SENHA_DO_EMAIL

# Endpoint para enviar a nova senha
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
        mensagem["From"] = EMAIL_QUE_VAI_ENVIAR
        mensagem["To"] = email_destino
        mensagem["Subject"] = "Sua nova senha"
        mensagem.attach(MIMEText(f"Sua nova senha é: {nova_senha}", "plain"))

        # Envia o email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORTA) as servidor:
            servidor.starttls()  # Ativa a criptografia
            servidor.login(EMAIL_QUE_VAI_ENVIAR, SENHA_DO_EMAIL)
            servidor.sendmail(EMAIL_QUE_VAI_ENVIAR, email_destino, mensagem.as_string())

        return jsonify({"mensagem": "Senha enviada com sucesso!"}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao enviar o email: {str(e)}"}), 500