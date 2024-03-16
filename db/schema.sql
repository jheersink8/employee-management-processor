-- Delete the existence of "EMP_db" if it exists.
DROP DATABASE IF EXISTS emp_db WITH (FORCE);
-- Create "EMP_db"
CREATE DATABASE emp_db;
-- Write to "EMP_db"
\c emp_db;

-- Table Creation 
CREATE TABLE department(
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    -- DEPARTMENT_ID FOREIGN KEY
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL 
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    -- ROLE_ID FOREIGN KEY
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);
