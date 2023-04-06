const accountDao = require("./accountDao");
const postingDao = require("./postingDao");
const readingHistoryDao = require("./bookTimerDao");
const accountDao = require('./accountDao')
const postingDao = require('./postingDao')
const readingHistoryDao = require('./bookTimerDao')
const mylistDao = require('./mylistDao')
const lastPageDao = require("./lastPageDao");
const bookShelfDao = require("./bookShelfDao");


module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao,
    ...bookShelfDao,
    ...lastPageDao,
    ...mylistDao
}
