from flask import Flask, jsonify
from time import sleep


app = Flask(__name__)


@app.route("/vivo")
def alive():
    return jsonify(saludo="hola mundo redondo"), 200


@app.route("/prueba")
def prueba():
    sleep(2)
    respuesta = {
        "asd":"asdasd"
    }
    return jsonify(respuesta), 200


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
