require('dotenv').config()

const { prompt } = require('inquirer')
const mysql = require('mysql2')

const addHandler = (table) => {
  console.log(`calling addHandler`)
  const deptAttributes = ['name']
  const roleAttributes = ['title', 'salary', 'department_id']
  const employeeAttributes = ['first_name', 'last_name', 'role_id', 'manager_id']

  const connection = mysql.createConnection({
    host: 'localhost',
    database: 'company_db',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS
  })

  connection.query('SELECT * FROM department;', (err, results) => {
    let validDepartments = results
    connection.query('SELECT * FROM role;', (err, results) => {
      let validRoles = results
      connection.query('SELECT * FROM employee;', (err, results) => {
        let validEmployees = results
        console.log(`Adding a new ${table}...`)
        switch (table) {
          case 'department':
            const departmentPrompt = {
              name: 'name',
              type: 'input',
              message: 'Enter a name for the new department'
            }
            prompt(departmentPrompt)
              .then(({ name }) => {
                connection.query(`INSERT INTO ${table} (name) VALUES ("${name}");`, (err, results) => {
                  if (err) { console.log(err) }
                  connection.end()
                  console.log(`Added new ${table}: ${name}`)
                  mainMenuLauncher()
                })
              })
              .catch(err => console.log(err))
            break;
          case 'role':
            break;
          case 'employee':
            break;
          default:
            console.log('Error! invalid table')
            break;
        }
      })
    })
  })
}

const updateHandler = (table, others) => {
  console.log(updateHandler)
  console.log(table)
  console.log(others)
}

const viewHandler = (table) => {
  console.log(viewHandler)
  console.log(table)
}

const actionHandler = (op, table, others) => {
  console.log(`calling actionHandler`)
  switch (op) {
    case 'add':
      addHandler(table)
      break;
    case 'view':
      viewHandler(table)
      break;
    case 'update':
      updateHandler(table, others)
      break;
    default:
      break;
  }
}

const mainMenuLauncher = () => {
  console.log(`calling mainMenuLauncher`)
  const mainMenuChoices = ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee Role']

  const mainMenuPrompt = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: mainMenuChoices
  }
  //Launches the main menu
  prompt(mainMenuPrompt)
    .then(({ choice }) => {
      //Choice: a string from the mainMenuChoices array
      //Remove capitals
      choice = choice.toLowerCase()
      //Split it into useful parameters
      let [op, table, ...others] = choice.split(' ')
      //Remove plurals
      if (table[table.length - 1] == 's') {
        table = table.substring(0, table.length - 1)
      }
      actionHandler(op, table, others)
    })
    .catch(err => console.log(err))
}

mainMenuLauncher()