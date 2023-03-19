const pgClient = require("../connections/postgresql");

class LastPageRepository {
    constructor() {
        this._repositoryName = "LastPageRepository";
    }
    get name() {
        return this._repositoryName;
    }

    async updateLastPageList(bookId, currentPage, totalPage) {
        const query = await pgClient("tbl_mybook")
            .where({ id: bookId })
            .update({
                current_page: currentPage,
                total_page: totalPage,
            });

        return await query;
    }

    async findById(bookId) {
        const query = await pgClient("tbl_mybook")
            .where({ id: bookId })
            .first();
        return query;
    }
}

module.exports = {
    LastPageRepository,
};
