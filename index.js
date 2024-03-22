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
        // ---------------PROMPT DEPARTMENT---------------------
        case questions.set2AddQuestions.choices[0]:
            const userDepartmentAnswer = await inquirer.prompt([questions.set3AddDepartment1]);
            const userDepartmentParsed = userDepartmentAnswer[questions.set3AddDepartment1.name];
            // ---------------RUN FINAL QUERY ---------------------
            const runAddQuery = new query.AddQuery(`INSERT INTO department (name) VALUES ('${userDepartmentParsed}')`);
            await runAddQuery.runQuery();
            returnQuit();
            break;

        // Add a role
        case questions.set2AddQuestions.choices[1]:
            // ---------------PROMPT ROLE---------------------
            const userRoleAnswer = await inquirer.prompt([questions.set3AddRole1]);
            const userRoleParsed = userRoleAnswer[questions.set3AddRole1.name];
            // ---------------PROMPT SALARY---------------------
            const userSalaryAnswer = await inquirer.prompt([questions.set3AddRole2]);
            const userSalaryParsed = userSalaryAnswer[questions.set3AddRole2.name];
            // ---------------QUERY INQUIRER CHOICES---------------------
            const departmentAddResults = await query.runAddQuery1.runQuery(); // Load query results for data 
            const set3AddRole3 = new questions.ListQuestions('list', 'selDepartment', 'Select the department for the role.', departmentAddResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userSelDepartmentAnswer = await inquirer.prompt([set3AddRole3]); // Define user response
            const userSelDepartmentParsed = userSelDepartmentAnswer.selDepartment.split('|')[0]; // Parse out relevant data for next query
            // ADD QUERY HERE USING RESULTS FROM userRoleParsed, userSalaryParsed, userSelDepartmentParsed
            // ------------------------------------------------------
            // ---------------RUN FINAL QUERY ---------------------

            // console.log(userRoleParsed)
            // console.log(userSalaryParsed)
            // console.log(userSelDepartmentParsed)

            // ------------------------------------------------------


            returnQuit();
            break;
        // Add an employee
        case questions.set2AddQuestions.choices[2]:
            // ---------------PROMPT FIRST NAME---------------------
            const userFirstNameAnswer = await inquirer.prompt([questions.set3AddEmployee1]);
            const userFirstNameParsed = userFirstNameAnswer[questions.set3AddEmployee1.name];
            // ---------------PROMPT LAST NAME---------------------    
            const userLastNameAnswer = await inquirer.prompt([questions.set3AddEmployee2]);
            const userLastNameParsed = userLastNameAnswer[questions.set3AddEmployee2.name];
            // ---------------QUERY ROLE INQUIRER CHOICES ---------------------
            const roleAddResults = await query.runAddQuery1.runQuery(); // Load query results for data 
            const set3AddEmployee3 = new questions.ListQuestions('list', 'selRole', 'Select the employee`s role.', roleAddResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userRoleAddAnswer = await inquirer.prompt([set3AddEmployee3]); // Define user response
            const userRoleAddParsed = userRoleAddAnswer.selRole.split('|')[0]; // Parse out relevant data for next query
            // ---------------QUERY MANAGER INQUIRER CHOICES ---------------------
            const managerAddResults = await query.runAddQuery2.runQuery(); // Load query results for data 
            const set3AddEmployee4 = new questions.ListQuestions('list', 'selManager', 'Select the employee`s manager.', managerAddResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userManagerAddAnswer = await inquirer.prompt([set3AddEmployee4]); // Define user response
            const userManagerAddParsed = userManagerAddAnswer.selManager.split('|')[0]; // Parse out relevant data for next query
            // ADD QUERY HERE USING RESULTS FROM userFirstNameParsed, userLastNameParsed, userRoleAddParsed, userRoleAddParsed
            // ------------------------------------------------------
            // ---------------RUN FINAL QUERY ---------------------

            // console.log(userFirstNameParsed);
            // console.log(userLastNameParsed);
            // console.log(userRoleAddParsed);
            // console.log(userManagerAddParsed);

            // ------------------------------------------------------
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
            // ---------------QUERY INQUIRER CHOICES ROUND 2---------------------    
            const departmentDeleteResults = await query.runDeleteQuery1.runQuery(); // Load query results for data 
            const set3DeleteDepartment1 = new questions.ListQuestions('list', 'selDepartment', 'Select a department to delete.', departmentDeleteResults); // Populate choices in question
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userDepartmentDeleteAnswer = await inquirer.prompt([set3DeleteDepartment1]); // Define user response
            const userDepartmentDeleteParsed = userDepartmentDeleteAnswer.selDepartment.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN UPDATE QUERY ---------------------
            const runDeleteQuery1 = new query.UpdateQuery(`DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id=${userDepartmentDeleteParsed})`);
            const runDeleteQuery1x = new query.UpdateQuery(`DELETE FROM role WHERE department_id=${userDepartmentDeleteParsed}`);
            const runDeleteQuery1y = new query.UpdateQuery(`DELETE FROM department WHERE id=${userDepartmentDeleteParsed}`);
            await runDeleteQuery1.runQuery();
            await runDeleteQuery1x.runQuery();
            await runDeleteQuery1y.runQuery();

            returnQuit();
            break;
        // Delete a role
        case questions.set2DeleteQuestions.choices[1]:
            // ---------------QUERY INQUIRER CHOICES ROUND 2---------------------    
            const roleDeleteResults = await query.runDeleteQuery2.runQuery(); // Load query results for data 
            const set3DeleteRole1 = new questions.ListQuestions('list', 'selRole', 'Select a role to delete.', roleDeleteResults);
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userRoleDeleteAnswer = await inquirer.prompt([set3DeleteRole1]); // Define user response
            const userRoleDeleteParsed = userRoleDeleteAnswer.selRole.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN UPDATE QUERY ---------------------
            const runDeleteQuery2 = new query.UpdateQuery(`DELETE FROM employee WHERE role_id=${userRoleDeleteParsed}`);
            const runDeleteQuery2x = new query.UpdateQuery(`DELETE FROM role WHERE id=${userRoleDeleteParsed}`);
            await runDeleteQuery2.runQuery();
            await runDeleteQuery2x.runQuery();

            returnQuit();
            break;
        // Delete an employee
        case questions.set2DeleteQuestions.choices[2]:
            // ---------------QUERY INQUIRER CHOICES ROUND 2---------------------    
            const employeeDeleteResults = await query.runDeleteQuery3.runQuery(); // Load query results for data 
            const set3DeleteEmployee1 = new questions.ListQuestions('list', 'selEmployee', 'Select an employee to delete.', employeeDeleteResults);
            // ---------------PRESENT QUERIED RESULTS---------------------
            const userEmployeeDeleteAnswer = await inquirer.prompt([set3DeleteEmployee1]); // Define user response
            const userEmployeeDeleteParsed = userEmployeeDeleteAnswer.selEmployee.split('|')[0]; // Parse out relevant data for next query
            // ---------------RUN UPDATE QUERY ---------------------
            const runDeleteQuery3 = new query.UpdateQuery(`DELETE FROM employee WHERE id=${userEmployeeDeleteParsed}`);
            await runDeleteQuery3.runQuery();
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