const inquirer = require('inquirer');
const questions = require('./scripts/questions');
const query = require('./scripts/queries')

function init() {
    console.log("Welcome to the EMP (Employee Management Portal)!")
    inquirer.prompt([
        // SET 1 QUESTIONS - Initial question to determine if query is View, Add, Edit, or Delete
        questions.set1questions,
    ])
        .then((response) => {
            //   SET 2 QUESTIONS - Users are asked set-2 questions and then a switch statement to route to proper formula based on user's selection
            switch (response[questions.set1questions.name]) {
                // This case routes to the VIEW formulas
                case questions.set1questions.choices[0]:
                    inquirer.prompt([questions.set2ViewQuestions])
                        .then((response) => {
                            viewQuestions(response[questions.set2ViewQuestions.name]);
                        })
                    break;
                // This case routes to the ADD formulas
                case questions.set1questions.choices[1]:
                    inquirer.prompt([questions.set2AddQuestions])
                        .then((response) => {
                            addQuestions(response[questions.set2AddQuestions.name]);
                        })
                    break;
                // This case routes to the UPDATE formulas
                case questions.set1questions.choices[2]:
                    inquirer.prompt([questions.set2UpdateQuestions])
                        .then((response) => {
                            updateQuestions(response[questions.set2UpdateQuestions.name]);
                        })
                    break;
                // This case routes to the DELETE formulas
                case questions.set1questions.choices[3]:
                    inquirer.prompt([questions.set2DeleteQuestions])
                        .then((response) => {
                            deleteQuestions(response[questions.set2DeleteQuestions.name]);
                        })
                    break;
            }
        })
};

// SET 3 QUESTIONS - Run the query depending on user selections/input
// This function displays the table for the view queries
async function viewQuestions(result) {
    switch (result) {
        // View all departments
        case questions.set2ViewQuestions.choices[0]:
            await query.runViewQuery1.runQuery();
            returnQuit();
            break;
        // View all roles
        case questions.set2ViewQuestions.choices[1]:
            await query.runViewQuery2.runQuery();
            returnQuit();
            break;
        // View all employees
        case questions.set2ViewQuestions.choices[2]:
            await query.runViewQuery3.runQuery();
            returnQuit();
            break;
        // View all employees by manager
        case questions.set2ViewQuestions.choices[3]:
            // ---------------QUERY INQUIRER CHOICES---------------------
            const managerViewResults = await query.runViewQuery4.runQuery(); // Load query results for managers 
            const set3ViewEmployeeManager = new questions.ListQuestions('list', 'selManager', 'Select the name of the manager to see their direct reports.', managerViewResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userManagerViewAnswer = await inquirer.prompt([set3ViewEmployeeManager]); // Define user response
            const userManagerViewParsed = userManagerViewAnswer.selManager.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN FINAL QUERY ---------------------
            const runViewQuery4 = new query.ViewQuery(`SELECT CONCAT (id,' | ', first_name,' ',  last_name) FROM employee WHERE manager_id = ${userManagerViewParsed}`);
            await runViewQuery4.runQuery();
            returnQuit();
            break;
        // View all employees by department
        case questions.set2ViewQuestions.choices[4]:
            // ---------------QUERY INQUIRER CHOICES---------------------
            const departmentsViewResults = await query.runViewQuery5.runQuery(); // Load query results for data 
            const set3ViewEmployeeDepartment = new questions.ListQuestions('list', 'selDepartment', 'Select the name of the department to see its employees.', departmentsViewResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userDepartmentAnswer = await inquirer.prompt([set3ViewEmployeeDepartment]); // Define user response
            const userDepartmentParsed = userDepartmentAnswer.selDepartment.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN FINAL QUERY ---------------------
            const runViewQuery5 = new query.ViewQuery(`SELECT CONCAT (employee.id,' | ', first_name,' ',  last_name) FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id WHERE department_id = ${userDepartmentParsed}`);
            await runViewQuery5.runQuery();
            returnQuit();
            break;
        // View the total utalized employee budget by department
        case questions.set2ViewQuestions.choices[5]:
            await query.runViewQuery6.runQuery();
            returnQuit();
            break;
    }
};

// This function asks the user prompts for adding data to the database
async function addQuestions(result) {
    switch (result) {
        // Add a department
        case questions.set2AddQuestions.choices[0]:
            inquirer.prompt([questions.set3AddDepartment1])
            returnQuit();
            break;
        // Add a role
        case questions.set2AddQuestions.choices[1]:
            inquirer.prompt([
                questions.set3AddRole1,
                questions.set3AddRole2,
                questions.set3AddRole3,])
            returnQuit();
            break;
        // Add an employee
        case questions.set2AddQuestions.choices[2]:
            inquirer.prompt([
                questions.set3AddEmployee1,
                questions.set3AddEmployee2,
                questions.set3AddEmployee3,
                questions.set3AddEmployee4,])
            returnQuit();
            break;
    }
};
// This function asks the user prompts for updating data in the database
async function updateQuestions(result) {
    switch (result) {
        // Update an employee's role
        case questions.set2UpdateQuestions.choices[0]:
            // ---------------QUERY INQUIRER CHOICES ROUND 1---------------------    
            const employeeUpdateResults = await query.runUpdateQuery1.runQuery(); // Load query results for data 
            const set3UpdateEmployeeRole1 = new questions.ListQuestions('list', 'selEmployee', 'Select an employee to update their role.', employeeUpdateResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userEmployeeUpdateRoleAnswer1 = await inquirer.prompt([set3UpdateEmployeeRole1]); // Define user response
            const userEmployeeUpdateRoleParsed1 = userEmployeeUpdateRoleAnswer1.selEmployee.split('|')[0]; // Parse out relevant data for next query

            // ---------------QUERY INQUIRER CHOICES ROUND 2---------------------    
            const roleUpdateResults = await query.runUpdateQuery2.runQuery(); // Load query results for data 
            const set3UpdateEmployeeRole2 = new questions.ListQuestions('list', 'selRole', 'Select a role for the employee.', roleUpdateResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userEmployeeUpdateRoleAnswer2 = await inquirer.prompt([set3UpdateEmployeeRole2]); // Define user response
            const userEmployeeUpdateRoleParsed2 = userEmployeeUpdateRoleAnswer2.selRole.split('|')[0]; // Parse out relevant data for next query

            // ---------------RUN UPDATE QUERY ---------------------
            const runUpdateQuery = new query.UpdateQuery(`UPDATE employee SET role_id=${userEmployeeUpdateRoleParsed2} WHERE id=${userEmployeeUpdateRoleParsed1}`);
            await runUpdateQuery.runQuery();
            returnQuit();
            break;
        // Update an employee's manager
        case questions.set2UpdateQuestions.choices[1]:
            // ---------------QUERY INQUIRER CHOICES ROUND 1---------------------    
            const employeeUpdateResultsx = await query.runUpdateQuery3.runQuery(); // Load query results for data 
            const set3UpdateEmployeeManager1 = new questions.ListQuestions('list', 'selEmployee', 'Select an employee to update their manager.', employeeUpdateResultsx); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userEmployeeUpdateRoleAnswer1x = await inquirer.prompt([set3UpdateEmployeeManager1]); // Define user response
            const userEmployeeUpdateRoleParsed1x = userEmployeeUpdateRoleAnswer1x.selEmployee.split('|')[0]; // Parse out relevant data for next query
            // ---------------QUERY INQUIRER CHOICES ROUND 2---------------------    
            const ManagerUpdateResults = await query.runUpdateQuery4.runQuery(); // Load query results for data 
            const set3UpdateEmployeeManager2 = new questions.ListQuestions('list', 'selManager', 'Select the new manager for the employee.', ManagerUpdateResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userEmployeeUpdateManagerAnswer2 = await inquirer.prompt([set3UpdateEmployeeManager2]); // Define user response
            const userEmployeeUpdateManagerParsed2 = userEmployeeUpdateManagerAnswer2.selManager.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN UPDATE QUERY ---------------------
            const runUpdateQueryx = new query.UpdateQuery(`UPDATE employee SET manager_id=${userEmployeeUpdateManagerParsed2} WHERE id=${userEmployeeUpdateRoleParsed1x}`);
            await runUpdateQueryx.runQuery();
            returnQuit();
            break;
    }
};
// This function asks the user prompts for deleting data from the database
async function deleteQuestions(result) {
    switch (result) {
        // Delete a department
        case questions.set2DeleteQuestions.choices[0]:
            inquirer.prompt([questions.set3DeleteDepartment1])
            returnQuit();
            break;
        // Delete a role
        case questions.set2DeleteQuestions.choices[1]:
            inquirer.prompt([questions.set3DeleteRole1])
            returnQuit();
            break;
        // Delete an employee
        case questions.set2DeleteQuestions.choices[2]:
            inquirer.prompt([questions.set3DeleteEmployee1])
            returnQuit();
            break;
    }
};

// SET 4 QUESTION - Give the user the option to exit the application or return to the root menu
function returnQuit() {
    inquirer.prompt([
        questions.set4ReturnQuit
    ])
        .then((response) => {
            if (response[questions.set4ReturnQuit.name] === questions.set4ReturnQuit.choices[0]) {
                init();
            } else {
                process.exit();
            }
        });
};

init();