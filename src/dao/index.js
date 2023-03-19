const accountDao = require("./accountDao");
const postingDao = require("./postingDao");
const readingHistoryDao = require("./bookTimerDao");
const bookShelfDao = require("./bookShelfDao");

module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao,
    ...bookShelfDao,
};
