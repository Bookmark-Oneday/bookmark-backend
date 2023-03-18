const { LastPageRepository } = require("./repositories/lastPageRepository");

class LastPageDao {
    constructor() {
        this._daoName = "LastPageDao";
    }

    get daoName() {
        return this._daoName;
    }

    async updateBookLastPage(bookId, currentPage, totalPage) {
        const lastPageRepo = new LastPageRepository();
        const updatedRows = await lastPageRepo.updateLastPageList(
            bookId,
            currentPage,
            totalPage
        );

        return updatedRows;
    }
}

module.exports = { LastPageDao };
