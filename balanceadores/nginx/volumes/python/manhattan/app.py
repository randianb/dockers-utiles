from flask import Flask
from flask import jsonify


app = Flask(__name__)

@app.route('/')
def hello():
    
    respuesta = {
        "respuesta": "hola mundo redondo!"
    }
    
    return jsonify(respuesta)

