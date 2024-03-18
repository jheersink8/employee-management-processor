// Organized prompts for all possible inquirer questions in a three dimensional array: 
const questions = {
    // These are NOT dynamic variables. If you change them here, you have to update them elsewhere. 
    name: ['initialQuestions', 'viewQuestions', 'addQuestions', 'updateQuestions', 'deleteQuestions'],
    
    message: ['I want to:', 'I want to view:', 'I want to add:', 'I want to update:', 'I want to delete:'],
    
    choices: [
       
        // Initial Questions //
        [
            'view reports from the EMP',
            'add data to the EMP',
            'update existing data in the EMP',
            'delete data from the EMP'
        ],
       
        // "I want to view:" questions //
        [
            'all departments',
            'all roles',
            'all employees',
            'all employees by manager',
            'all employees by department',
            'the total utalized employee budget of a department',
        ],
       
        // "I want to add:" questions //
        [
            'a department to the organization',
            'a role to a department',
            'an employee to the organization',
        ],

        // "I want to update:" questions //
        [
            'an employee`s role',
            'an employee`s manager',
        ],

        // "I want to delete:" questions// 
        [
            'a department',
            'a role',
            'an employee',
        ]
    ]
};

module.exports = { questions };





