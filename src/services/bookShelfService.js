const { BookShelfDao } = require("../dao/bookShelfDao");

class BookShelfService {
    constructor() {
        this._serviceName = "BookShelfService";
    }

    get serviceName() {
        return this._serviceName;
    }

    async registerBook(book) {
        const bookShelfDao = new BookShelfDao();
        const updatedRows = await bookShelfDao.registerBook(book);
        return updatedRows;
    }
}

module.exports = { BookShelfService };
