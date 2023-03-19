const accountDao = require('./accountDao')
const postingDao = require('./postingDao')
const readingHistoryDao = require('./bookTimerDao')

module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao
}