// Import PostgreSQL Pool package, Inquirer, and inquirer questions (iq)
const inquirer = require('inquirer');
const iq = require('./questions');
const query = require('./query')
const rows = require('./query')
// Index variable used to determine which query to run 
let index;

// User prompts through inquirer questions from "questions.js" file

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: iq.questions.name[0],
            message: iq.questions.message[0],
            choices: iq.questions.choices[0]
        },
    ])
        // Dynamically choose next questions based on first input
        .then((response) => {
            for (var i = 0; i < iq.questions.choices[0].length; i++) {
                if (response[iq.questions.name[0]] === iq.questions.choices[0][i]) {
                    //Use the index code to determine which function and query to run 
                    index = i + 1
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: iq.questions.name[i + 1],
                            message: iq.questions.message[i + 1],
                            choices: iq.questions.choices[i + 1]
                        }
                    ])

                        .then((response) => {
                            questionIndex = response[iq.questions.name[index]]
                            switch (iq.questions.name[index]) {
                                // Function to query "VIEW" answers
                                case iq.questions.name[1]:
                                    query.viewQuestions(questionIndex)
                                    init();
                                // Function to query "ADD" answers
                                case iq.questions.name[2]:
                                    query.addQuestions(questionIndex);
                                    break;
                                // Function to query "UPDATE" answers
                                case iq.questions.name[3]:
                                    query.updateQuestions(questionIndex);
                                    break;
                                // Function to query "DELETE" answers
                                case iq.questions.name[4]:
                                    query.deleteQuestions(questionIndex);
                                    break;
                            }

                        })
                }
            }
        });

};

init();

