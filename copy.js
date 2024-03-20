const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

async function viewQuestions() {
    const { rows } = await pool.query("SELECT DISTINCT CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id WHERE m.first_name IS NOT NULL;");
    console.log(rows);
}

viewQuestions();