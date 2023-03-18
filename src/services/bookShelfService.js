const { BookShelfDao } = require("../dao/bookShelfDao");

class BookShelfService {
    constructor() {
        this._serviceName = "BookShelfService";
    }

    get serviceName() {
        return this._serviceName;
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
        const bookShelfDao = new BookShelfDao();

        const updatedRows = await bookShelfDao.registerBook(
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

module.exports = { BookShelfService };
