const pgClient = require("../connections/postgresql");

class BookShelfRepository {
    constructor() {
        this._repositoryName = "BookShelfRepository";
    }
    get name() {
        return this._repositoryName;
    }

    async getBookByUserIdAndISBN(userId, isbn) {
        return await pgClient("tbl_mybook")
            .where({
                user_id: userId,
                isbn: isbn,
            })
            .select();
    }

    async getBookByUserId(userId) {
        return await pgClient("tbl_mybook")
            .where({
                user_id: userId,
            })
            .select();
    }

    async getBookByBookId(bookId) {
        return await pgClient("tbl_mybook")
            .where({
                id: bookId,
            })
            .select();
    }

    async registerBook(book) {
        const {
            user_id,
            title,
            content,
            authors,
            publisher,
            translators,
            thumbnail_url,
            isbn,
            total_page,
            meta,
        } = book;
        const query = pgClient("tbl_mybook").insert({
            id: pgClient.raw("gen_random_uuid()"),
            user_id: user_id,
            title: title,
            content: content,
            authors: authors,
            publisher: publisher,
            translators: translators,
            thumbnail_url: thumbnail_url,
            isbn: isbn,
            total_page: total_page,
            meta: meta,
        });

        return await query;
    }

    async deleteBook(book) {
        const { user_id, book_id, meta } = book;
        const query = pgClient("tbl_mybook")
            .where({
                user_id: user_id,
                id: book_id,
            })
            .del();

        return await query;
    }
}

module.exports = {
    BookShelfRepository,
};
