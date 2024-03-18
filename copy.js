// Import PostgreSQL Pool package, Inquirer, and inquirer questions (iq)
const inquirer = require('inquirer');
const iq = require('./scripts/questions');
const query = require('./scripts/query')

// User prompts through inquirer questions from "questions.js" file
function init() {
    // Initial set of four questions that determine if the query is a VIEW, ADD, UPDATE, or DELETE
    inquirer.prompt([
        {
            type: 'list',
            name: "initialQuestions",
            message: 'ROOT MENU: I want to:',
            choices: iq.questions.choices[0]
        },
    ])
        .then((response) => {
            // Depending on the user's response, they'll be presented with more questions to determine what to do next
            switch (response.initialQuestions) {
                // Case for VIEW
                case iq.questions.choices[0][0]:
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'viewQuestions',
                            message: 'I want to view:',
                            choices: iq.questions.choices[1]
                        }
                    ])
                    break;

                // Case for ADD
                case iq.questions.choices[0][1]:
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'addQuestions',
                            message: 'I want to add:',
                            choices: iq.questions.choices[2]
                        }
                    ])
                        .then((results) => {
                            // Switch statement for all ADD possibilities
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
                        });

                // Case for UPDATE
                case iq.questions.choices[0][2]:
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'updateQuestions',
                            message: 'I want to update:',
                            choices: iq.questions.choices[3]
                        }
                    ])
                        .then((results) => {
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
                        });

                // Case for DELETE
                case iq.questions.choices[0][3]:
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'deleteQuestions',
                            message: 'I want to delete:',
                            choices: iq.questions.choices[4]
                        }
                    ])
                        .then((results) => {
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
                        });
            }
        })

}




init();

