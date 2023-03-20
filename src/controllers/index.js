const healthcheckController = require("./healthcheckController");
const boardController = require("./boardController");
const userController = require("./accountController");
const adminController = require("./adminController");
const bookTimerController = require("./bookTimerController");
const healthcheckController = require('./healthcheckController')
const boardController = require('./boardController')
const userController = require('./accountController')
const adminController = require('./adminController')
const bookTimerController = require('./bookTimerController')
const libraryController = require('./libraryController')
const lastPageController = require("./lastPageController");


module.exports = {
    ...healthcheckController,
    ...boardController,
    ...userController,
    ...adminController,
    ...bookTimerController,
    ...lastPageController,
    ...libraryController
}
