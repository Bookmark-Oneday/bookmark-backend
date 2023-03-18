const pgClient = require("../connections/postgresql");

class BookShelfRepository {
    constructor() {
        this._repositoryName = "BookShelfRepository";
    }
    get name() {
        return this._repositoryName;
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
        const authorsJSON = JSON.stringify(authors);
        const translatorsJSON = JSON.stringify(translators);

        const query = pgClient("tbl_mybook").insert({
            id: pgClient.raw("gen_random_uuid()"),
            user_id: user_id,
            title: title,
            content: content,
            authors: authorsJSON,
            publisher: publisher,
            translators: translatorsJSON,
            thumbnail_url: thumbnail,
            isbn: isbn,
            total_page: total_page,
            meta: meta,
        });
        // Check for duplicates with the same user_id and isbn
        const duplicateQuery = pgClient("tbl_mybook")
            .where({
                user_id: user_id,
                isbn: isbn,
            })
            .select();

        const duplicates = await duplicateQuery;

        if (duplicates.length > 0) {
            // If there are duplicates, return a 409 conflict error
            const error = new Error("Duplicate entry");
            error.statusCode = 409;
            throw error;
        }

        return await query;
    }
}

module.exports = {
    BookShelfRepository,
};
