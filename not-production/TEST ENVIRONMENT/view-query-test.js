// pg npm import
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

// Test code (DELETE IN PRODUCTION) //
const inquirer = require('inquirer');
inquirer.prompt([
    {
        type: 'list',
        message: 'I want to view:',
        name: 'viewQuestions',
        choices: ['all departments', 'all roles', 'all employees', 'all employees by manager', 'all employees by department', 'the total utalized employee budget of a department',]
    }
])
    .then((response) => {
        switch (response.viewQuestions) {
            case 'all departments':
                const runViewQuery1 = new ViewQuery("SELECT department.id AS department_id, department.name AS department_name FROM department;");
                runViewQuery1.runQuery();
                break;
            case 'all roles':
                const runViewQuery2 = new ViewQuery("SELECT role.id AS role_id, role.title AS role_title, role.salary AS role_salary, department.name AS department_name FROM role JOIN department ON role.department_id=department.id;");
                runViewQuery2.runQuery();
                break;
            case 'all employees':
                const runViewQuery3 = new ViewQuery("SELECT e.id AS employee_id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id;");
                runViewQuery3.runQuery();
                break;
        }
    })
// ------------------------- //

function ViewQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
        console.table(rows);
    };
};

// const runViewQuery = new ViewQuery("SELECT e.id AS employee_id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id");
// runViewQuery.runQuery();


// async function viewQuestions() {
//     const { rows } = await pool.query('SELECT * FROM department');
//     console.table(rows);
// }




// module.exports = { viewQuestions };