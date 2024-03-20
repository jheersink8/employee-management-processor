// pg npm import
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

//--------------------- VIEW QUERIES ---------------------//
function ViewQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
        console.table(rows);
    };
};

// View all departments
const runViewQuery1 = new ViewQuery("SELECT department.id AS department_id, department.name AS department_name FROM department;");
// View all roles
const runViewQuery2 = new ViewQuery("SELECT role.id AS role_id, role.title AS role_title, role.salary AS role_salary, department.name AS department_name FROM role JOIN department ON role.department_id=department.id;");
// View all employees
const runViewQuery3 = new ViewQuery("SELECT e.id AS employee_id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id;");

// -------------------------------
// View all employees by manager
const runViewQuery4 = new ViewQuery("SELECT role.id AS role_id, role.title AS role_title, role.salary AS role_salary, department.name AS department_name FROM role JOIN department ON role.department_id=department.id;");
// View all employees by department
const runViewQuery5 = new ViewQuery("SELECT e.id AS employee_id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id;");

// -------------------------------

// View the total utalized employee budget by department
const runViewQuery6 = new ViewQuery("SELECT department.name, SUM(role.salary) AS total_salary_per_department FROM role JOIN department ON role.department_id = department.id GROUP BY department.name;");


module.exports = { runViewQuery1, runViewQuery2, runViewQuery3, runViewQuery4, runViewQuery5, runViewQuery6 };