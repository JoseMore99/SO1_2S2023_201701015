# Manual Tecnico 
# Introducción
Este manual técnico proporciona información detallada sobre los componentes clave utilizados en el proyecto. Explicaremos la base de datos, Service Killer, módulos, GPC, grupos de instancias, autoscaling, Docker y Docker Compose.

## Base de Datos
La base de datos es un componente fundamental en la mayoría de las aplicaciones. Algunas consideraciones clave incluyen:

- **Tipo de Base de Datos**: MySQL es el sistema de gestión de bases de datos que utilizamos.
  
- **Esquema y Tablas**:

  ```sql 
  CREATE TABLE biblioteca.InfoPc (
    direccion_ip VARCHAR(15)  PRIMARY KEY
    );

    CREATE TABLE biblioteca.InfoRAM (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ram_usada DECIMAL(10,2),
        ram_libre DECIMAL(10,2),
        dir_ip VARCHAR(15),
        FOREIGN KEY (dir_ip) REFERENCES biblioteca.InfoPc(direccion_ip)
    );

    CREATE TABLE biblioteca.InfoCPU (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpu_usada DECIMAL(10,2),
        cpu_libre DECIMAL(10,2),
        dir_ip VARCHAR(15),
        pid INT NOT NULL,
        nombre_proceso VARCHAR(255) NOT NULL,
        usuario VARCHAR(255) NOT NULL,
        estado_proceso VARCHAR(50),
        porcentaje_ram DECIMAL(5, 2),
        FOREIGN KEY (dir_ip) REFERENCES biblioteca.InfoPc(direccion_ip)
);```

## Service Killer
En Linux, hay varias formas de detener un servicio o proceso, y las herramientas más comunes para hacerlo incluyen systemctl, service, kill, y pkill. Cada una de estas herramientas se utiliza para administrar servicios o procesos en el sistema, como detenerlos o reiniciarlos.

Para detener un proceso utilizando el comando kill, puedes usar el siguiente comando, donde PID es el identificador de proceso del proceso que deseas detener:

```bash
kill PID
```
## GPC (Grupo de Procesos en Contenedor)
El GPC es un enfoque que se utiliza para administrar y orquestar contenedores en un entorno de aplicaciones. Proporciona una visión general de cómo se utilizan los GPC en la arquitectura de la aplicación.


## Autoscaling
El autoscaling es una técnica que permite aumentar o disminuir automáticamente el número de instancias de servidor según la carga de la aplicación. Proporciona detalles sobre cómo se configura y utiliza el autoscaling en la aplicación.

## Docker
Docker es una plataforma de contenedores que se utiliza para empaquetar, distribuir y ejecutar aplicaciones de manera consistente. Proporciona información sobre cómo se utilizan los contenedores Docker en el proyecto.

Crear una imagen de Docker:

```
    docker build -t josemore99/vmso1 .
```
Ejecutar un contenedor:

```
    docker run -p 8080:8080 josemore99/vmso1
```

## Docker Compose
Docker Compose es una herramienta para definir y ejecutar aplicaciones Docker en varios contenedores a partir de la creacion del archivo _docker-compose.yml_ en el cual se detallara la relacion de los contenedores.


- Iniciar servicios con Docker Compose:

```
docker-compose up -d
```
- Detener y eliminar contenedores y redes:

```
docker-compose down
```
- Definición de Servicios: 
```
version: '3'
services:
  base:
    image: "mysql"
    container_name: 'MYSQL_P1'
    environment:
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - base_mysql:/var/lib/mysql      
    ports:
      - "3306:3306"
  backend:
    image: "josemore99/apinode"
    container_name: 'BackendNode'
    environment:
      DB_USER: root
      DB_PASSWORD: secret
      DB_HOST: MYSQL_P1
      DB_PORT: 3306
      DB_NAME: biblioteca
    ports:
      - "4000:4000"
    depends_on:
      - base
    links:
      - base
  frontend:
    image: "josemore99/webapp"
    container_name: "FrontReact"
    environment:
      URLAPI: "http://backend:4000/"
    ports:
      - "3000:3000"
    depends_on:
      - backend
    links:
      - backend
volumes:
  base_mysql: 
```