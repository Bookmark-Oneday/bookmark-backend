const accountDao = require("./accountDao");
const postingDao = require("./postingDao");
const readingHistoryDao = require("./bookTimerDao");
const accountDao = require('./accountDao')
const postingDao = require('./postingDao')
const readingHistoryDao = require('./bookTimerDao')
const mylistDao = require('./mylistDao')
const lastPageDao = require("./lastPageDao");


module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao,
    ...lastPageDao,
    ...mylistDao
}
