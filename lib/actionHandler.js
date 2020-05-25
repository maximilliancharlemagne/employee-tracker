//Handles an action from the main menu
const addHandler = require('./level1/addHandler')
const viewHandler = require('./level1/viewHandler')
const updateHandler = require('./level1/updateHandler')

const actionHandler = (op,table,others) => {
  console.log(`calling actionHandler`)
  switch (op) {
    case 'add':
      addHandler(table)
      break;
    case 'view':
      viewHandler(table)
      break;
    case 'update':
      updateHandler(table,others)
      break;
    default:
      break;
  }
}

module.exports = actionHandler