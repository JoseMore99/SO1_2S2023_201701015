# Usa una imagen base de Python en Alpine Linux
FROM python:3.9-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo de requerimientos al contenedor
COPY requirements.txt requirements.txt

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el contenido de la carpeta actual al contenedor
COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Comando para ejecutar la aplicación Flask
CMD ["python", "api.py"]