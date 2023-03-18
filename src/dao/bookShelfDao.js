const { BookShelfRepository } = require("./repositories/bookShelfRepository");

class BookShelfDao {
    constructor() {
        this._daoName = "BookShelfDao";
    }

    get daoName() {
        return this._daoName;
    }

    async registerBook(
        user_id,
        title,
        content,
        authors,
        publisher,
        translators,
        thumbnail,
        isbn,
        total_page,
        meta
    ) {
        const bookShelfRepo = new BookShelfRepository();
        const updatedRows = await bookShelfRepo.registerBook(
            user_id,
            title,
            content,
            authors,
            publisher,
            translators,
            thumbnail,
            isbn,
            total_page,
            meta
        );

        return updatedRows;
    }
}

module.exports = { BookShelfDao };
