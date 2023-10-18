create database timeBack;


CREATE TABLE usuario (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  numero_matricula VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(30) NOT NULL ,
  is_adm BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
);


CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  IF TG_OP = 'INSERT' THEN
    NEW.created_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER usuario_timestamp_trigger
BEFORE INSERT OR UPDATE ON usuario
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();



CREATE TABLE subjects (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);


CREATE TABLE situation (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);



CREATE TABLE monitoring (
  id SERIAL PRIMARY KEY NOT NULL,
  horas_semanais INT NOT NULL,
  subject_id INT REFERENCES subjects(id),
  user_id INT REFERENCES usuario(id),
  situation_id INT REFERENCES situation(id),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);


CREATE TABLE point_register (
  id SERIAL PRIMARY KEY NOT NULL,
  monitoring_id INT REFERENCES monitoring(id),
  hora_entrada TIME NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

