const accountDao = require("./accountDao");
const postingDao = require("./postingDao");
const readingHistoryDao = require("./bookTimerDao");
const accountDao = require('./accountDao')
const postingDao = require('./postingDao')
const readingHistoryDao = require('./bookTimerDao')
const mylistDao = require('./mylistDao')
const lastPageDao = require("./lastPageDao");
const bookShelfDao = require("./bookShelfDao");
const onelinerDao = require("./onelinerDao");

module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao,
    ...bookShelfDao,
    ...lastPageDao,
    ...mylistDao,
    ...onelinerDao
}
