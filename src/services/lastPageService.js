const { LastPageDao } = require("../dao/lastPageDao");

class LastPageService {
    constructor() {
        this._serviceName = "LastPageService";
    }

    get serviceName() {
        return this._serviceName;
    }

    async updateLastPage(bookId, currentPage, totalPage) {
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
