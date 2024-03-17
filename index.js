// Import PostgreSQL Pool package, Inquirer, and inquirer questions (iq)
const { Pool } = require('pg');
const inquirer = require('inquirer');
const iq = require('./scripts/questions');

// Connect to database
const pool = new Pool(
    {
        user: 'postgres',
        password: '1234',
        database: 'emp_db'
    },
)
pool.connect();

// pool.query(`SELECT * FROM department`, function (err, {rows}) {
//     console.log(rows);
// })

// User prompts through inquirer
inquirer.prompt([
    {
        type: 'list',
        name: iq.questions.name[0],
        message: iq.questions.message[0],
        choices: iq.questions.choices[0]
    },
])
    .then((response) => {
        for (var i = 0; i < iq.questions.choices[0].length; i++) {
            if (response[iq.questions.name[0]] === iq.questions.choices[0][i]) {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: iq.questions.name[i + 1],
                        message: iq.questions.message[i + 1],
                        choices: iq.questions.choices[i + 1]
                    }
                ])
            }
        }
    });