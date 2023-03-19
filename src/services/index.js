const healthcheckService = require("./healthcheckService");
const versionService = require("./versionService");
const errorService = require("./errorService");
const postingService = require("./postingService");
const accountService = require("./accountService");
const adminService = require("./adminService");
const bookTimerService = require("./bookTimerService");
const DecoratorService = require("../dao/bookTimerDecorator");
const lastPageService = require("./lastPageService");

module.exports = {
    ...healthcheckService,
    ...versionService,
    ...errorService,
    ...postingService,
    ...accountService,
    ...adminService,
    ...bookTimerService,
    ...DecoratorService,
    ...lastPageService,
};
