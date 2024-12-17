import random
import string

# Função para gerar uma nova senha aleatória
def gerar_senha():
    caracteres = string.ascii_letters + string.digits + "!@#$%^&*()"
    return "".join(random.choices(caracteres, k=10))