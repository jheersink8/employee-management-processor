const query = require('./queries')

// Constructor to organize and build out list formatted inquirer questions
function ListQuestions(type, name, message, choices) {
    this.type = type,
        this.name = name,
        this.message = message,
        this.choices = choices;
};

// Constructor to organize and build out input formatted inquirer questions
function InputQuestions(type, name, message) {
    this.type = type,
        this.name = name,
        this.message = message
};

// First set of questions //
const set1questions = new ListQuestions('list', 'initialQuestions', 'ROOT MENU: I want to:', ['View reports from the EMP', 'Add data to the EMP', 'Update existing data in the EMP', 'Delete data from the EMP']);

// Second set of questions //
const set2ViewQuestions = new ListQuestions('list', 'viewQuestions', 'I want to view:', ['all departments', 'all roles', 'all employees', 'all employees by manager', 'all employees by department', 'the total utalized employee budget of a department',]);
const set2AddQuestions = new ListQuestions('list', 'addQuestions', 'I want to add:', ['a department to the organization', 'a role to a department', 'an employee to the organization',]);
const set2UpdateQuestions = new ListQuestions('list', 'updateQuestions', 'I want to update:', ['an employee`s role', 'an employee`s manager',]);
const set2DeleteQuestions = new ListQuestions('list', 'deleteQuestions', 'I want to delete:', ['a department', 'a role', 'an employee',]);

// Third set of questions //
// ADD DEPARTMENT QUESTIONS
const set3AddDepartment1 = new InputQuestions('input', 'entDepartment', 'Enter the name of the department to add.');

// ADD ROLE QUESTIONS
const set3AddRole1 = new InputQuestions('input', 'entRole', 'Enter the name of the role to add.');
const set3AddRole2 = new InputQuestions('input', 'entSalary', 'Enter the salary for the new role.');

// ADD EMPLOYEE QUESTIONS
const set3AddEmployee1 = new InputQuestions('input', 'entFirst', 'Enter the employee`s first name.');
const set3AddEmployee2 = new InputQuestions('input', 'entLast', 'Enter the employee`s last name.');

// FINAL QUESTION
const set4ReturnQuit = new ListQuestions('list', 'returnHome', 'Would you like to return to the root menu or quit?', ['Return to Root Menu', 'Quit']);
module.exports = { ListQuestions, set1questions, set2ViewQuestions, set2AddQuestions, set2UpdateQuestions, set2DeleteQuestions, set3AddDepartment1, set3AddRole1, set3AddRole2, set3AddEmployee1, set3AddEmployee2, set4ReturnQuit };


