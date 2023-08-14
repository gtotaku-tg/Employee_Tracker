// import
const inquirer = require("inquirer");
const db = require("./connection");
// require ("dotenv").config();
// const cTable = require("console.table");?
// const figlet = require("figlet");



// db.connect(err =>{
//     if (err) throw err;
//     console.log("Connected to db!");
//     start();
// });


async function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "Choice an option:",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                // ----
                "View all employees by manager",
                "View all employees by department",
                "Update an employee manager",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "View the total utilized budget of a department",
                "Exit"
            ]
        }
    ]).then(res => {
        switch (res.start) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
                //=----------------
            case "View all employees by manager":
                viewEmployeesByManager();
                break;
            case "View all employees by department":
                viewEmployeesByDepartment();
                break;
            case "Update an employee manager":
                updateManager();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "View the total utilized budget of a department":
                viewBudget();
                break;
            case "Exit":
                db.end();
                break;
        }
    })
}

// View all departments
function viewDepartments() {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View all roles
function viewRoles() {
    db.query(`SELECT * FROM role `,  (err, res) =>{
        if (err) throw err;
        console.table(res);
        start();
    })
}

// View all employees
function viewEmployees() {
    db.query(`SELECT * FROM employee`, 
    function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

// Add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?"
        }
    ]).then(res => {
        db.query("INSERT INTO department SET ?", { name: res.newDepartment },  (err, res) => {
            if (err) throw err;
            console.log("Department added");
            start();
        })
    })
}

// Add a role
function addRole() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const department = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "What is the name of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?"
            },
            {
                type: "list",
                name: "department",
                message: "Which department does the new role belong to?",
                choices: department
            }
        ]).then(res => {
            db.query("INSERT INTO role SET ?", { title: res.newRole, salary: res.salary, department_id: res.department }, function (err, res) {
                if (err) throw err;
                console.log("Role added");
                start();
            })
        })
    })
}

// Add an employee
function addEmployee() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const role = res.map(role => ({ name: role.title, value: role.id }));
        db.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            const manager = res.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the new employee?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the new employee?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the role of the new employee?",
                    choices: role
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager of the new employee?",
                    choices: manager
                }
            ]).then(res => {
                db.query("INSERT INTO employee SET ?", { first_name: res.firstName, last_name: res.lastName, role_id: res.role, manager_id: res.manager }, function (err, res) {
                    if (err) throw err;
                    console.log("Employee added");
                    start();
                })
            })
        })
    })
}

// Update an employee role
function updateRole() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const employee = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
        db.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;
            const role = res.map(role => ({ name: role.title, value: role.id }));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee's role do you want to update?",
                    choices: employee
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's new role?",
                    choices: role
                }
            ]).then(res => {
                db.query("UPDATE employee SET role_id = ? WHERE id = ?", [res.role, res.employee], function (err, res) {
                    if (err) throw err;
                    console.log("Employee role updated");
                    start();
                })
            })
        })
    })
}

//"Update an employee manager"
function updateManager() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const employee = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
        db.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            const manager = res.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee's manager do you want to update?",
                    choices: employee
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's new manager?",
                    choices: manager
                }
            ]).then(res => {
                db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [res.manager, res.employee], function (err, res) {
                    if (err) throw err;
                    console.log("Employee manager updated");
                    start();
                })
            })
        })
    })
}

// "View all employees by department",
function viewEmployeesByDepartment() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const department = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department's employees do you want to view?",
                choices: department
            }
        ]).then(res => {
            db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            WHERE department.id = ?`, res.department, function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
    })
}

// "View all employees by manager"

function viewEmployeesByManager() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const manager = res.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "manager",
                message: "Which manager's employees do you want to view?",
                choices: manager
            }
        ]).then(res => {
            db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            WHERE manager.id = ?`, res.manager, function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
    })
}

// "Delete a department",

function deleteDepartment() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const department = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department do you want to delete?",
                choices: department
            }
        ]).then(res => {
            db.query("DELETE FROM department WHERE id = ?", res.department, function (err, res) {
                if (err) throw err;
                console.log("Department deleted");
                start();
            })
        })
    })
}

// "Delete a role",

function deleteRole() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const role = res.map(role => ({ name: role.title, value: role.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Which role do you want to delete?",
                choices: role
            }
        ]).then(res => {
            db.query("DELETE FROM role WHERE id = ?", res.role, function (err, res) {
                if (err) throw err;
                console.log("Role deleted");
                start();
            })
        })
    })
}

// "Delete an employee",

function deleteEmployee() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const employee = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee do you want to delete?",
                choices: employee
            }
        ]).then(res => {
            db.query("DELETE FROM employee WHERE id = ?", res.employee, function (err, res) {
                if (err) throw err;
                console.log("Employee deleted");
                start();
            })
        })
    })
}

// "View the total utilized budget of a department",

function viewBudget() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const department = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department's budget do you want to view?",
                choices: department
            }
        ]).then(res => {
            db.query(`SELECT department.name AS department, SUM(role.salary) AS budget
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ?`, res.department, function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
    })
}



start();
