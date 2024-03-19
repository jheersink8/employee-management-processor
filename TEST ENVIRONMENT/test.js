const inquirer = require('inquirer');
const questions = require('./inquirer_questions');

let queryType;
inquirer.prompt([
    // Initial question to determine if query is View, Add, Edit, or Delete
    questions.set1questions,
])
    .then((response) => {
        //   Users are asked set-2 questions and then a switch statement to route to proper formula based on user's selection
        switch (response[questions.set1questions.name]) {
            // This case routes to the VIEW formulas
            case questions.set1questions.choices[0]:
                inquirer.prompt([questions.set2ViewQuestions])
                queryType = "VIEW";
                break;
            // This case routes to the ADD formulas
            case questions.set1questions.choices[1]:
                inquirer.prompt([questions.set2AddQuestions])
                    .then((response) => {
                        queryType = "ADD";
                        addQuestions(response[questions.set2AddQuestions.name]);
                    })
                break;
            // This case routes to the UPDATE formulas
            case questions.set1questions.choices[2]:
                inquirer.prompt([questions.set2UpdateQuestions])
                    .then((response) => {
                        queryType = "UPDATE";
                        updateQuestions(response[questions.set2UpdateQuestions.name]);
                    })
                break;
            // This case routes to the DELETE formulas
            case questions.set1questions.choices[3]:
                inquirer.prompt([questions.set2DeleteQuestions])
                    .then((response) => {
                        queryType = "DELETE";
                        deleteQuestions(response[questions.set2DeleteQuestions.name]);
                    })
                break;
        }
    })

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


// questions.set4ReturnQuit

