const {
    DuplicateBook,
    InvalidUUID,
    MyBookNotFound,
} = require("../services/errorService");
const { BookShelfRepository } = require("./repositories/bookShelfRepository");

class BookShelfDao {
    constructor() {
        this._daoName = "BookShelfDao";
    }

    get daoName() {
        return this._daoName;
    }

    async registerBook(book) {
        const bookShelfRepo = new BookShelfRepository();

        const { user_id, isbn } = book;

        // Check for duplicates with the same user_id and isbn
        const duplicateQuery = await bookShelfRepo.getBookByUserIdAndISBN(
            user_id,
            isbn
        );
        if (duplicateQuery.length > 0) {
            throw new DuplicateBook(isbn);
        }

        const { authors, translators } = book;
        const authorsJSON = JSON.stringify(authors);
        const translatorsJSON = JSON.stringify(translators);

        const updatedRows = await bookShelfRepo.registerBook({
            ...book,
            authors: authorsJSON,
            translators: translatorsJSON,
        });

        return updatedRows;
    }

    async deleteBook(book) {
        const bookShelfRepo = new BookShelfRepository();

        const { user_id, book_id } = book;

        const checkBook = await bookShelfRepo.getBookByUserIdAndBookId(
            user_id,
            book_id
        );
        if (checkBook.length === 0) {
            throw new MyBookNotFound(book_id);
        }

        const updatedRows = await bookShelfRepo.deleteBook({
            user_id,
            book_id,
        });

        return updatedRows;
    }
}

module.exports = { BookShelfDao };
