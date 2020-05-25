const mysql = require('mysql2')

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
    console.log(results)
  })

  console.log(`Adding a new ${table}...`)
  switch (table) {
    case 'department':
      break;
    case 'role':
      break;
    case 'employee':
      break;
    default:
      break;
  }
}

module.exports = addHandler