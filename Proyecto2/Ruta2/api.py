from flask import Flask, request
from flask_cors import CORS
import redis
import json
import os
import db
from dotenv import load_dotenv
load_dotenv()

app= Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
r = redis.StrictRedis(host=os.getenv("DB_RED_HOST"), port=os.getenv("DB_RED_PORT"), db=os.getenv("DB_RED_NAME"))

print("Api en flask de Jose Moreira")

@app.route("/", methods=['GET'])
def hola():
    return "<h1>Hola Mundo 201701015</h1>"


@app.route("/inserts", methods=['POST'])
def getdb2():
    valoresEstudiuante = request.json
    #REDIS
    json_data = json.dumps(valoresEstudiuante)
    r.incr("contador")
    r.rpush(os.getenv("DB_key"),json_data)
    #MYSQL  
    conexion = db.GetConection()
    cursor = conexion.cursor()
    print(valoresEstudiuante)
    print(valoresEstudiuante)
    datos = (valoresEstudiuante["carnet"],valoresEstudiuante["nombre"],valoresEstudiuante["curso"],valoresEstudiuante["nota"],valoresEstudiuante["semestre"],valoresEstudiuante["year"])
    cursor.execute("INSERT INTO Estudiantes (carnet,nombre,curso,nota,semestre,anio) VALUES (%s,%s,%s,%s,%s,%s);",datos)
    conexion.commit()
    cursor.fetchall()
    return ({'message': 'Data stored successfully'})


@app.route("/gets", methods=['GET'])
def getdb():
    elementos = r.lrange(os.getenv("DB_key"), 0, -1)
    retorno =[]
    for i in elementos:
        retorno.append( json.loads(i)) 
    return retorno

if __name__=="__main__":
    app.run(host='0.0.0.0', port=8000)

