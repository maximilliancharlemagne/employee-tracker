const { prompt } = require('inquirer')

require('dotenv').config()

const libs = require('./lib')

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
      libs.actionHandler(op, table, others)
    })
    .catch(err => console.log(err))
}

mainMenuLauncher()

module.exports = mainMenuLauncher