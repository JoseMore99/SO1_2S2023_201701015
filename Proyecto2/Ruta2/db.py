import pymysql
from dotenv import load_dotenv
import os
import csv
#cargar las variables de entorno
load_dotenv()

#realizar la coneccion a la db
def get_conection():
    return pymysql.connect(host=os.getenv("DB_MY_HOST"),
                           user= os.getenv("DB_MY_USER"),
                           password= os.getenv("DB_MY_PASSWORD"),
                           port= int(os.getenv("DB_MY_PORT"))
                           )
