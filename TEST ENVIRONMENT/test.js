const inquirer = require('inquirer');
const questions = require('./inquirer_questions');


inquirer.prompt([questions.set0questions,
questions.set1ViewQuestions,
questions.set1AddQuestions,
questions.set1UpdateQuestions,
questions.set1DeleteQuestions]);