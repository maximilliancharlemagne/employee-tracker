//Handles an action from the main menu
const addHandler = require('./addHandler')
const viewHandler = require('./viewHandler')
const updateHandler = require('./updateHandler')

const actionHandler = (op,table,others) => {
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