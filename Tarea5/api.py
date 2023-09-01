from flask import Flask, request
from flask_cors import CORS

app= Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

print("Api en flask de Jose Moreira")

@app.route("/", methods=['GET'])
def hola():
    return "<h1>Hola Mundo 201701015</h1>"

if __name__=="__main__":
    app.run(host='0.0.0.0', port=8000)

