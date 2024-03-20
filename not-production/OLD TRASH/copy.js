const inquirer = require('inquirer');
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
// Constructor to organize and build out list formatted inquirer questions
function ListQuestions(type, name, message, choices) {
    this.type = type,
        this.name = name,
        this.message = message,
        this.choices = choices;
};


// Function to build choices from PostgreSQL
async function runQuery() {
    const { rows } = await pool.query("SELECT array_agg(DISTINCT CONCAT (m.first_name,' ', m.last_name)) FROM employee e LEFT JOIN employee m ON e.manager_id = m.id WHERE m.first_name IS NOT NULL;");
    const choices = rows[0].array_agg;
    return choices;
};

// Function to populate choices
async function buildQuestion(choices) {
    const secondTest = new ListQuestions('list', 'testQuestion2', 'Populate List', choices);
    console.log(secondTest);
};

// Async function to coordinate the build and population of choices
async function runandbuild() {
    const results = await runQuery(); // Build the choices
    await buildQuestion(results); // Populate the choices
};

// Call the main function to execute the process
runandbuild();


