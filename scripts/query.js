const inquirer = require('inquirer');
const iq = require('./questions');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

// Queries for everything in the "View" category
let viewQuestions = function (results) {
    console.log(`You can see the ${results} of a view request!`);
};

// Queries for everything in the "Add" category
let addQuestions = function (results) {
    switch (results) {
        // Add a department to the organization //
        case iq.questions.choices[2][0]:
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'entDepartment',
                    message: 'Enter the name of the department to add.'
                }
            ])
            break;

        // Add a role to a department //
        case iq.questions.choices[2][1]:
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'entRole',
                    message: 'Enter the name of the role to add.'
                },
                {
                    type: 'input',
                    name: 'entSalary',
                    message: 'Enter the salary for the new role.'
                },
                {
                    type: 'list',
                    name: 'selDepartment',
                    message: 'Select the department for the role.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder1"]
                }
            ])
            break;

        // Add an employee to the organization //
        case iq.questions.choices[2][2]:
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'entFirst',
                    message: 'Enter the employee`s first name.'
                },
                {
                    type: 'input',
                    name: 'entLast',
                    message: 'Enter the employee`s last name.'
                },
                {
                    type: 'list',
                    name: 'selRole',
                    message: 'Select the employee`s role.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
                {
                    type: 'list',
                    name: 'selManager',
                    message: 'Select the employee`s manager.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                }
            ])
            break;
    }
};

// Queries for everything in the "Update" category
let updateQuestions = function (results) {
    switch (results) {
        // Update an employee's role //
        case iq.questions.choices[3][0]:
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selEmployee',
                    message: 'Select an employee to update their role.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
                {
                    type: 'list',
                    name: 'selRole',
                    message: 'Select a role for the employee.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
            ])
            break;

        // Update an employee's manager //
        case iq.questions.choices[3][1]:
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selEmployee',
                    message: 'Select an employee to update their manager.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
                {
                    type: 'list',
                    name: 'selManager',
                    message: 'Select the new manager for the employee.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder1"]
                }
            ])
            break;
    }
};

// Queries for everything in the "Delete" category
let deleteQuestions = function (results) {
    switch (results) {
        // Delete a department //
        case iq.questions.choices[4][0]:
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selDepartment',
                    message: 'Select a department to delete.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
            ])
            break;
        // Delete a role //
        case iq.questions.choices[4][1]:
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selRole',
                    message: 'Select a role to delete.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
            ])
            break;
        // Delete an employee //
        case iq.questions.choices[4][2]:
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selEmployee',
                    message: 'Select an employee to delete.',
                    // POPULATE WITH DB RESULTS //
                    choices: ["placeholder"]
                },
            ])
            break;
    }
};

module.exports = { viewQuestions, addQuestions, updateQuestions, deleteQuestions };