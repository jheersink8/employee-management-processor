const inquirer = require('inquirer');
function ListQuestions(type, name, message, choices) {
    this.type = type,
        this.name = name,
        this.message = message,
        this.choices = choices
};

const set0questions = new ListQuestions('list', 'initialQuestions', 'ROOT MENU: I want to:', [
    'View reports from the EMP',
    'Add data to the EMP',
    'Update existing data in the EMP',
    'Delete data from the EMP'
]);

const set1ViewQuestions = new ListQuestions('list', 'viewQuestions', 'I want to view:', [
    'all departments',
    'all roles',
    'all employees',
    'all employees by manager',
    'all employees by department',
    'the total utalized employee budget of a department',
]);
const set1AddQuestions = new ListQuestions('list', 'addQuestions', 'I want to add:', [
    'a department to the organization',
    'a role to a department',
    'an employee to the organization',
]);
const set1UpdateQuestions = new ListQuestions('list', 'updateQuestions', 'I want to update:', [
    'an employee`s role',
    'an employee`s manager',
]);
const set1DeleteQuestions = new ListQuestions('list', 'deleteQuestions', 'I want to delete:', [
    'a department',
    'a role',
    'an employee',
]);

// console.log(set0questions)

// inquirer.prompt([set0questions]);

module.exports = { set0questions, set1ViewQuestions, set1AddQuestions, set1UpdateQuestions, set1DeleteQuestions };