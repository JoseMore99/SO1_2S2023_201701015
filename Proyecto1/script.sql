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
);