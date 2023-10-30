import pymysql
from dotenv import load_dotenv
import os
load_dotenv()

def GetConection():
    return pymysql.connect(host=os.getenv("DB_MY_HOST"),
                           user= os.getenv("DB_MY_USER"),
                           password= os.getenv("DB_MY_PASSWORD"),
                           port= int(os.getenv("DB_MY_PORT")),
                           database= os.getenv("DB_MY_NAME")
                           )
