-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;


-- SELECT e1.first_name, e1.last_name, role.title, department.name, e1.manager_id, 
-- FROM department
-- JOIN role ON department.id = role.department_id
-- JOIN employee e1 ON role.id = e1.role_id
-- LEFT JOIN employee e2 ON e1.manager_id = e2.id;


SELECT m.id AS manager_id,
       ARRAY_AGG(DISTINCT m.first_name || ' ' || m.last_name) AS manager_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
WHERE m.first_name IS NOT NULL
GROUP BY m.id;