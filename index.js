const inquirer = require('inquirer');
const questions = require('./scripts/questions');
const query = require('./scripts/queries')

function init() {
    console.log("Welcome to the EMP (Employee Management Portal)!")
    inquirer.prompt([
        // SET 1 QUESTIONS - Initial question to determine if query is View, Add, Edit, or Delete
        questions.set1questions,
    ])
        .then((response) => {
            //   SET 2 QUESTIONS - Users are asked set-2 questions and then a switch statement to route to proper formula based on user's selection
            switch (response[questions.set1questions.name]) {
                // This case routes to the VIEW formulas
                case questions.set1questions.choices[0]:
                    inquirer.prompt([questions.set2ViewQuestions])
                        .then((response) => {
                            viewQuestions(response[questions.set2ViewQuestions.name]);
                        })
                    break;
                // This case routes to the ADD formulas
                case questions.set1questions.choices[1]:
                    inquirer.prompt([questions.set2AddQuestions])
                        .then((response) => {
                            addQuestions(response[questions.set2AddQuestions.name]);
                        })
                    break;
                // This case routes to the UPDATE formulas
                case questions.set1questions.choices[2]:
                    inquirer.prompt([questions.set2UpdateQuestions])
                        .then((response) => {
                            updateQuestions(response[questions.set2UpdateQuestions.name]);
                        })
                    break;
                // This case routes to the DELETE formulas
                case questions.set1questions.choices[3]:
                    inquirer.prompt([questions.set2DeleteQuestions])
                        .then((response) => {
                            deleteQuestions(response[questions.set2DeleteQuestions.name]);
                        })
                    break;
            }
        })
};

// SET 3 QUESTIONS - Run the query depending on user selections/input
// This function displays the table for the view queries
async function viewQuestions(result) {
    switch (result) {
        // View all departments
        case questions.set2ViewQuestions.choices[0]:
            await query.runViewQuery1.runQuery();
            returnQuit();
            break;
        // View all roles
        case questions.set2ViewQuestions.choices[1]:
            await query.runViewQuery2.runQuery();
            returnQuit();
            break;
        // View all employees
        case questions.set2ViewQuestions.choices[2]:
            await query.runViewQuery3.runQuery();
            returnQuit();
            break;
        // View all employees by manager
        case questions.set2ViewQuestions.choices[3]:
            // Load query results in question options
            // Populate choices in question
            await inquirer.prompt([questions.set3ViewEmployeeManager])
            await query.runViewQuery4.runQuery();
            returnQuit();
            break;
        // View all employees by department
        case questions.set2ViewQuestions.choices[4]:
            await inquirer.prompt([questions.set3ViewEmployeeDepartment])
            await query.runViewQuery5.runQuery();
            returnQuit();
            break;
        // View the total utalized employee budget by department
        case questions.set2ViewQuestions.choices[5]:
            await query.runViewQuery6.runQuery();
            returnQuit();
            break;
    }
};

// This function asks the user prompts for adding data to the database
function addQuestions(result) {
    switch (result) {
        // Add a department
        case questions.set2AddQuestions.choices[0]:
            inquirer.prompt([questions.set3AddDepartment1])
            break;
        // Add a role
        case questions.set2AddQuestions.choices[1]:
            inquirer.prompt([
                questions.set3AddRole1,
                questions.set3AddRole2,
                questions.set3AddRole3,])
            break;
        // Add an employee
        case questions.set2AddQuestions.choices[2]:
            inquirer.prompt([
                questions.set3AddEmployee1,
                questions.set3AddEmployee2,
                questions.set3AddEmployee3,
                questions.set3AddEmployee4,])
            break;
    }
};
// This function asks the user prompts for updating data in the database
function updateQuestions(result) {
    switch (result) {
        // Update an employee's role
        case questions.set2UpdateQuestions.choices[0]:
            inquirer.prompt([
                questions.set3UpdateEmployeeRole1,
                questions.set3UpdateEmployeeRole2])
            break;
        // Update an employee's manager
        case questions.set2UpdateQuestions.choices[1]:
            inquirer.prompt([
                questions.set3UpdateEmployeeManager1,
                questions.set3UpdateEmployeeManager2,
            ])
            break;
    }
};
// This function asks the user prompts for deleting data from the database
function deleteQuestions(result) {
    switch (result) {
        // Delete a department
        case questions.set2DeleteQuestions.choices[0]:
            inquirer.prompt([questions.set3DeleteDepartment1])
            break;
        // Delete a role
        case questions.set2DeleteQuestions.choices[1]:
            inquirer.prompt([questions.set3DeleteRole1])
            break;
        // Delete an employee
        case questions.set2DeleteQuestions.choices[2]:
            inquirer.prompt([questions.set3DeleteEmployee1])
            break;
    }
};

// SET 4 QUESTION - Give the user the option to exit the application or return to the root menu
function returnQuit() {
    inquirer.prompt([
        questions.set4ReturnQuit
    ])
        .then((response) => {
            if (response[questions.set4ReturnQuit.name] === questions.set4ReturnQuit.choices[0]) {
                init();
            } else {
                process.exit();
            }
        });
};

init();