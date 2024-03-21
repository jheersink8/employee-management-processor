// pg npm import
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

//--------------------- BUILDING INQUIRER QUESTION QUERIES ---------------------//
// Function to build choices from PostgreSQL
function InquirerPopulateQuery(query) {
    this.query = query
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.query}`);
        const choices = rows[0].array_agg;
        // console.log(choices);
        return choices;
    };
};

//--------------------- VIEW QUERIES ---------------------//
// Constructor function for building "VIEW" related queries
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
// Populate managers into Inquirer choices
const runViewQuery4 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (m.id,' | ',m.first_name,' ', m.last_name)) FROM employee e LEFT JOIN employee m ON e.manager_id = m.id WHERE m.first_name IS NOT NULL;");
// View all employees by department
const runViewQuery5 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', name)) FROM department");
// View the total utalized employee budget by department
const runViewQuery6 = new ViewQuery("SELECT department.name, SUM(role.salary) AS total_salary_per_department FROM role JOIN department ON role.department_id = department.id GROUP BY department.name;");

//--------------------- ADD QUERIES ---------------------//
function AddQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
    };
};

// Add a role to the organization
const runAddQuery1 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', name)) FROM department");

//--------------------- UPDATE QUERIES ---------------------//
// Constructor function for building "UPDATE" related queries
function UpdateQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
    };
};
// Update the employee's role
const runUpdateQuery1 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', first_name,' ', last_name)) FROM employee");
const runUpdateQuery2 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', title)) FROM role");
// Update the employee's manager
const runUpdateQuery3 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', first_name,' ', last_name)) FROM employee");
const runUpdateQuery4 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (m.id,' | ',m.first_name,' ', m.last_name)) FROM employee e LEFT JOIN employee m ON e.manager_id = m.id WHERE m.first_name IS NOT NULL;");

//--------------------- DELETE QUERIES ---------------------//
// Constructor function for building "DELETE" related queries
function DeleteQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
    };
};
// Delete a department
const runDeleteQuery1 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', name)) FROM department");
// Delete a role
const runDeleteQuery2 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', title)) FROM role");
// Delete an employee
const runDeleteQuery3 = new InquirerPopulateQuery("SELECT array_agg(DISTINCT CONCAT (id,' | ', first_name,' ', last_name)) FROM employee");

module.exports = { ViewQuery, AddQuery, UpdateQuery, DeleteQuery, runViewQuery1, runViewQuery2, runViewQuery3, runViewQuery4, runViewQuery5, runViewQuery6, runAddQuery1, runUpdateQuery1, runUpdateQuery2, runUpdateQuery3, runUpdateQuery4, runDeleteQuery1, runDeleteQuery2, runDeleteQuery3 };