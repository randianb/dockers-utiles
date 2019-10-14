import json

from flask import Flask
from flask import jsonify


app = Flask(__name__)


@app.route('/flask')
def hello():
    respuesta = {
        "respuesta": "hola mundo redondo!"
    }
    return jsonify(respuesta)


# USADO POR GUNICORN
def application(environ, start_response):

    respuesta = {
        "servidor-numero": 2
    }

    headers = [("Content-Type", "application/json")]
    start_response("200 OK", headers)

    return [bytes(json.dumps(respuesta), 'utf-8')]
