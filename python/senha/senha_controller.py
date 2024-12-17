from flask import Flask
from senha.services.enviarSenha_service import enviar_senha

app = Flask(__name__)

@app.route("/enviar-senha", methods=["POST"])
def enviar_senha_controller():
    return enviar_senha()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5003)