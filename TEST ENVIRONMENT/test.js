const inquirer = require('inquirer');
const questions = require('./inquirer_questions');


inquirer.prompt([questions.set1questions,
questions.set2ViewQuestions,
questions.set2AddQuestions,
questions.set2UpdateQuestions,
questions.set2DeleteQuestions,
questions.set3AddDepartment1, 
questions.set3AddRole1, 
questions.set3AddRole2, 
questions.set3AddRole3, 
questions.set3AddEmployee1, 
questions.set3AddEmployee2, 
questions.set3AddEmployee3, 
questions.set3AddEmployee4, 
questions.set3UpdateEmployeeRole1, 
questions.set3UpdateEmployeeRole2, 
questions.set3UpdateEmployeeManager1, 
questions.set3UpdateEmployeeManager2, 
questions.set3DeleteDepartment1, 
questions.set3DeleteRole1, 
questions.set3DeleteEmployee1
]);

