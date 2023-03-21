const healthcheckService = require("./healthcheckService");
const versionService = require("./versionService");
const errorService = require("./errorService");
const postingService = require("./postingService");
const accountService = require("./accountService");
const adminService = require("./adminService");
const bookTimerService = require("./bookTimerService");
const DecoratorService = require("../dao/bookTimerDecorator");
const bookShelfService = require("./bookShelfService");
const lastPageService = require("./lastPageService");
const mylistService = require('./mylistService')


module.exports = {
    ...healthcheckService,
    ...versionService,
    ...errorService,
    ...postingService,
    ...accountService,
    ...adminService,
    ...mylistService,
    ...bookTimerService,
    ...DecoratorService,
    ...bookShelfService,
    ...lastPageService,
};
