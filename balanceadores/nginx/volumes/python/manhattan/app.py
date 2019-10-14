from flask import Flask
from flask import jsonify


app = Flask(__name__)


@app.route('/flask')
def hello():

    respuesta = {
        "respuesta": "hola mundo redondo!"
    }

    return jsonify(respuesta)


def server(environ, start_response):
    
    data = b"Hello, World!\n"
    start_response("200 OK", [
        ("Content-Type", "application/json"),
        ("Content-Length", str(len(data)))
    ])
    return iter([data])
