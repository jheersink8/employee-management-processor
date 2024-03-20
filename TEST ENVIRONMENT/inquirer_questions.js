// Constructor to organize and build out list formatted inquirer questions
function ListQuestions(type, name, message, choices) {
    this.type = type,
        this.name = name,
        this.message = message,
        this.choices = choices
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
const set3AddRole3 = new ListQuestions('list', 'selDepartment', 'Select the department for the role.', ['PLACEHOLDER_ADD_ROLE']);

// ADD EMPLOYEE QUESTIONS
const set3AddEmployee1 = new InputQuestions('input', 'entFirst', 'Enter the employee`s first name.');
const set3AddEmployee2 = new InputQuestions('input', 'entLast', 'Enter the employee`s last name.');
const set3AddEmployee3 = new ListQuestions('list', 'selRole', 'Select the employee`s role.', ['PLACEHOLDER_ADD_EMPLOYEE']);
const set3AddEmployee4 = new ListQuestions('list', 'selManager', 'Select the employee`s manager.', ['PLACEHOLDER_ADD_EMPLOYEE']);

// UPDATE EMPLOYEE'S ROLE QUESTIONS
const set3UpdateEmployeeRole1 = new ListQuestions('list', 'selEmployee', 'Select an employee to update their role.', ['PLACEHOLDER_UPDATE_EMPLOYEE_ROLE']);
const set3UpdateEmployeeRole2 = new ListQuestions('list', 'selRole', 'Select a role for the employee.', ['PLACEHOLDER_UPDATE_EMPLOYEE_ROLE']);

// UPDATE EMPLOYEE'S MANAGER QUESTIONS
const set3UpdateEmployeeManager1 = new ListQuestions('list', 'selEmployee', 'Select an employee to update their manager.', ['PLACEHOLDER_UPDATE_EMPLOYEE_MANAGER']);
const set3UpdateEmployeeManager2 = new ListQuestions('list', 'selManager', 'Select the new manager for the employee.', ['PLACEHOLDER_UPDATE_EMPLOYEE_MANAGER']);

// DELETE A DEPARTMENT QUESTIONS
const set3DeleteDepartment1 = new ListQuestions('list', 'selDepartment', 'Select a department to delete.', ['PLACEHOLDER_DELETE_A_DEPARTMENT']);

// DELETE A ROLE QUESTIONS
const set3DeleteRole1 = new ListQuestions('list', 'selRole', 'Select a role to delete.', ['PLACEHOLDER_DELETE_A_ROLE']);

// DELETE AN EMPLOYEE QUESTIONS
const set3DeleteEmployee1 = new ListQuestions('list', 'selEmployee', 'Select an employee to delete.', ['PLACEHOLDER_DELETE_A_EMPLOYEE']);

// FINAL QUESTION
const set4ReturnQuit = new ListQuestions('list', 'returnHome', 'Would you like to return to the root menu or quit?', ['Return to Root Menu', 'Quit']);

module.exports = { set1questions, set2ViewQuestions, set2AddQuestions, set2UpdateQuestions, set2DeleteQuestions, set3AddDepartment1, set3AddRole1, set3AddRole2, set3AddRole3, set3AddEmployee1, set3AddEmployee2, set3AddEmployee3, set3AddEmployee4, set3UpdateEmployeeRole1, set3UpdateEmployeeRole2, set3UpdateEmployeeManager1, set3UpdateEmployeeManager2, set3DeleteDepartment1, set3DeleteRole1, set3DeleteEmployee1, set4ReturnQuit };