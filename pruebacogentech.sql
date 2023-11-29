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