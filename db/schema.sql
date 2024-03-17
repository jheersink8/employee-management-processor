-- Delete the existence of "EMP_db" if it exists.
DROP DATABASE IF EXISTS emp_db WITH (FORCE);
-- Create "EMP_db"
CREATE DATABASE emp_db;
-- Write to "EMP_db"
\c emp_db;

-- Table Creation 
CREATE TABLE department(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    -- DEPARTMENT_ID FOREIGN KEY
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL 
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    -- ROLE_ID FOREIGN KEY
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    -- MANAGER_ID FOREIGN KEY
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
