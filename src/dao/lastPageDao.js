const validator = require("validator");
const {
    InvalidUUID,
    MyBookNotFound,
    InternalServerError,
} = require("../services/errorService");
const { LastPageRepository } = require("./repositories/lastPageRepository");

class LastPageDao {
    constructor() {
        this._daoName = "LastPageDao";
    }

    get daoName() {
        return this._daoName;
    }

    async updateBookLastPage(bookId, currentPage, totalPage) {
        // uuid type check
        if (!validator.isUUID(bookId)) {
            throw new InvalidUUID(bookId);
        }

        const lastPageRepo = new LastPageRepository();
        const updatedRows = await lastPageRepo.updateLastPageList(
            bookId,
            currentPage,
            totalPage
        );

        // Check Book Existence
        if (!updatedRows) {
            throw new MyBookNotFound(bookId);
        }

        // Check if the update is successful
        const updatedBook = await lastPageRepo.findById(bookId);
        if (
            updatedBook.current_page != currentPage ||
            updatedBook.total_page != totalPage
        ) {
            throw new InternalServerError();
        }

        return;
    }
}

module.exports = { LastPageDao };
