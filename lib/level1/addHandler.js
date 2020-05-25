const mysql = require('mysql2')
const { prompt } = require('inquirer')
const mainMenuLauncher = require('../mainMenuLauncher')

const addHandler = (table) => {
  console.log(`calling addHandler`)
  const deptAttributes = ['name']
  const roleAttributes = ['title','salary','department_id']
  const employeeAttributes = ['first_name','last_name','role_id','manager_id']
  
  const connection = mysql.createConnection({
    host: 'localhost',
    database: 'company_db',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS
  })

  connection.query('SELECT * FROM department;',(err,results) => {
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
              connection.query(`INSERT INTO ${table} (name) VALUES ("${name}");`,(err, results) => {
                if(err){console.log(err)}
                connection.end()
                console.log(`Added new ${table}: ${name}`)
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

module.exports = addHandler