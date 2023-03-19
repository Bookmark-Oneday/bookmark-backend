const healthcheckController = require('./healthcheckController')
const boardController = require('./boardController')
const userController = require('./accountController')
const adminController = require('./adminController')
const bookTimerController = require('./bookTimerController')

module.exports = {
    ...healthcheckController,
    ...boardController,
    ...userController,
    ...adminController,
    ...bookTimerController
}