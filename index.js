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
            const roleTitlePrompt = {
              name: 'title',
              type: 'input',
              message: 'What is the title of the new role?'
            }
            const roleSalaryPrompt = {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of the new role?'
            }
            const roleDeptPrompt = {
              name: 'dept',
              type:  'list',
              message: 'Which department is the new role in?',
              choices: validDepartments
            }
            const rolePrompts = [roleTitlePrompt,roleSalaryPrompt,roleDeptPrompt]
            prompt(rolePrompts)
              .then(data => {
                let deptID = validDepartments.find(element => element.name == data.dept).id
                connection.query(`INSERT INTO ${table}(title,salary,department_id) VALUES("${data.title}",${data.salary},${deptID});`, (err, results) => {
                  if(err){console.log(err)}
                  connection.end()
                  console.log(`Added new ${table}: ${data.title}`)
                  mainMenuLauncher()
                })
                })
              .catch(err => console.log(err))
            break;
          case 'employee':
            let simpleEmployees = []
            validEmployees.forEach(element => {
              simpleEmployees.push(element.first_name +' '+ element.last_name)
            })
            let simpleRoles = []
            validRoles.forEach(element => {
              simpleRoles.push(element.title)
            })
            const employeeNamePrompt = {
              name: 'name',
              type: 'input',
              message: 'What is the new employee\'s name? (Firstname Lastname)'
            }
            const employeeManagerPrompt = {
              name: 'manager',
              type: 'list',
              message: 'Who is the new employee\'s manager?',
              choices: simpleEmployees.concat(['null'])
            }
            const employeeRolePrompt = {
              name: 'role',
              type: 'list',
              message: 'What is the new employee\'s role?',
              choices: simpleRoles
            }
            const employeePrompts = [employeeNamePrompt, employeeManagerPrompt, employeeRolePrompt]
            prompt(employeePrompts)
              .then(data => {
                let roleID = validRoles.find(element => element.title == data.role).id
                let managerID
                if(data.manager == 'null'){
                  managerID = 'null'
                }
                else{
                  managerID = validEmployees.find(element => element.first_name == data.manager.split(' ')[0] && element.last_name == data.manager.split(' ')[1]).id
                }
                connection.query(`INSERT INTO ${table}(first_name,last_name,role_id,manager_id) VALUES("${data.name.split(' ')[0]}","${data.name.split(' ')[1]}",${roleID},${managerID});`, (err, results) => {
                  if (err) { console.log(err) }
                  connection.end()
                  console.log(`Added new ${table}: ${data.title}`)
                  mainMenuLauncher()
                })
              })
              .catch(err => console.log(err))
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
  const connection = mysql.createConnection({
    host: 'localhost',
    database: 'company_db',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS
  })

  let propertyToUpdate = others[0]

  connection.query('SELECT * FROM department;', (err, results) => {
    let validDepartments = results
    connection.query('SELECT * FROM role;', (err, results) => {
      let validRoles = results
      connection.query('SELECT * FROM employee;', (err, results) => {
        let validEmployees = results
        let simpleEmployees = []
        validEmployees.forEach(element => {
          simpleEmployees.push(element.first_name + ' ' + element.last_name)
        })
        let simpleRoles = []
        validRoles.forEach(element => {
          simpleRoles.push(element.title)
        })

        switch (table) {
          case 'employee':
            switch (propertyToUpdate) {
              case 'role':
                const employeePrompt = {
                  type: 'list',
                  name: 'employee',
                  message: 'Which employee\'s role would you like to change?',
                  choices: simpleEmployees
                }
                const rolePrompt = {
                  type: 'list',
                  name: 'newRole',
                  message: 'What would you like to change their role to?',
                  choices: simpleRoles
                }
                prompt([employeePrompt,rolePrompt])
                .then(data => {
                  let roleID = validRoles.find(element => element.title == data.newRole).id
                  connection.query(`UPDATE ${table} SET role_id = ${roleID} WHERE first_name = "${data.employee.split(' ')[0]}" AND last_name = "${data.employee.split(' ')[1]}";`,(err,results) => {
                    if(err){console.log(err)}
                    connection.end()
                    console.log(`Updated ${table} ${data.employee}: ${propertyToUpdate} changed to ${data.newRole}`)
                    mainMenuLauncher()
                  })
                })
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
      })
    })
  })
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