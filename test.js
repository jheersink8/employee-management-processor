const inquirer = require('inquirer');
const iq = require('./scripts/questions');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

async function viewQuestions() {
    const { rows } = await pool.query('SELECT * FROM department');
    console.table(rows);
}

async function init() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'list',
                name: "testQuestion",
                message: "Do you want to run the test report?",
                choices: ["Yes", "No"]
            }
        ]);

        if (response.testQuestion === "Yes") {
            await viewQuestions();
            const response2 = await inquirer.prompt([
                {
                    type: 'list',
                    name: "returnHome",
                    message: "Would you like to return to the root menu or quit?",
                    choices: ["Return to Root Menu", "Quit"]
                }
            ]);
            if (response2.returnHome === "Return to Root Menu") {
                await init();
            } else {
                process.exit();
            }
        } else {
            process.exit();
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
init();

// async function init() {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: "testQuestion",
//             message: "Do you want to run the test report?",
//             choices: ["Yes", "No"]
//         },
//     ])
//         .then((response) => {
//             if (response.testQuestion === "Yes") {
//                 viewQuestions();
//                 inquirer.prompt([{
//                     type: 'list',
//                     name: "returnHome",
//                     message: "Would you like to return to the root menu?",
//                     choices: ["Yes", "No"]

//                 }])
//                     .then((response) => {
//                         if (response.returnHome === "Yes") {
//                             init();
//                         } else {
//                             return;
//                         }
//                     })
//             } else {
//                 console.log("Go home now!")
//             }
//         })
// };


// console.log("Start")
// async function viewQuestions() {
//     pool.query('SELECT * FROM department', function (err, { rows }) {
//         console.table(rows);
//         console.log("END")
//     });
// };



// init();