// Import PostgreSQL Pool package and Inquirer
const { Pool } = require('pg');
const inquirer = require('inquirer');

// Connect to database
const pool = new Pool(
    {
        user: 'postgres',
        password: '1234',
        host: 'localhost',
        database: 'database_name_db'
    },
)
pool.connect();


// User prompts through inquirer
inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your name?',
            name: 'Question1'
        }
    ])