// Organized prompts for all possible inquirer questions in a three dimensional array: 
const questions = {
    name: ['initialQuestions', 'viewQuestions', 'addQuestions', 'updateQuestions', 'deleteQuestions'],
    message: ['I want to:', 'I want to view:', 'I want to add:', 'I want to update:', 'I want to delete:'],
    choices: [
        ['view reports from the EMP', 'add data to the EMP', 'update existing data in the EMP', 'delete data from the EMP'],
        ['all departments', 'all roles', 'all employees', 'all employees by manager', 'all employees by department', 'the total utalized employee budget of a department', '--Go back--'],
        ['a department to the organization', 'a role to a department', 'an employee to the organization', '--Go back--'],
        ['an employee`s role', 'an employee`s manager', '--Go back--'],
        ['a department', 'a role', 'an employee', '--Go back--']
    ]
};

module.exports = { questions };





