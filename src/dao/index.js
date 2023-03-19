const accountDao = require("./accountDao");
const postingDao = require("./postingDao");
const readingHistoryDao = require("./bookTimerDao");
const lastPageDao = require("./lastPageDao");

module.exports = {
    ...accountDao,
    ...postingDao,
    ...readingHistoryDao,
    ...lastPageDao,
};
