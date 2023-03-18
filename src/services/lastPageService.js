const validator = require("validator");
const { InvalidUUIID } = require("./errorService");
const { LastPageDao } = require("../dao/lastPageDao");

class LastPageService {
    constructor() {
        this._serviceName = "LastPageService";
    }

    get serviceName() {
        return this._serviceName;
    }

    async updateLastPage(bookId, currentPage, totalPage) {
        // uuid type check
        if (!validator.isUUID(bookId)) {
            throw new InvalidUUIID(bookId);
        }

        const lastPageDao = new LastPageDao();

        const updatedRows = await lastPageDao.updateBookLastPage(
            bookId,
            currentPage,
            totalPage
        );
        return updatedRows;
    }
}

module.exports = { LastPageService };
