-- Crear la base de datos "cogentech"
CREATE DATABASE cogentech;

-- Crear la tabla "employees"
CREATE TABLE cogentech.public.employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    dateadd TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dateupdate TIMESTAMP,
    version INT,
    supervisor BOOLEAN,
    supervisorid INT
);

-- Inserción de datos
INSERT INTO cogentech.public.employees 
    ("name",lastname,email,phone,dateadd,dateupdate,"version",supervisor,supervisorid) 
VALUES
	('Pedro','Naveda','np@employee.com','5555555','2023-11-28 23:32:34.022','2023-11-28 23:32:34.022',0,true,NULL),
	('Jose','Petit','jp@employee.com','5555566','2023-11-29 03:46:28.798','2023-11-29 14:03:11.347',0,true,1),
	('Pablo','Navas','np@employee.com','5556666','2023-11-29 14:07:33.261','2023-11-29 14:07:33.261',0,NULL,3),
	('Juan','Perez','jp@employee.com','5555666','2023-11-29 02:49:22.284','2023-11-29 14:08:40.798',1,NULL,3);