const { BookShelfService, MissingRequestParameter } = require("../services");

const bookShelfController = async (ctx) => {
    const bookShelfService = new BookShelfService();

    const {
        title,
        content,
        authors,
        publisher,
        translators,
        thumbnail_url,
        isbn,
        total_page,
    } = ctx.request.body;

    // check if any of the book data is missing
    if (
        Object.values({
            title,
            content,
            authors,
            publisher,
            translators,
            thumbnail_url,
            isbn,
            total_page,
        }).some((value) => !value)
    ) {
        throw new MissingRequestParameter("Some of the book information");
    }

    const user_id = ctx.request.headers.user_id;

    // check user_id value
    if (!user_id) {
        throw new MissingRequestParameter("user_id");
    }

    const bookData = {
        user_id,
        title,
        content,
        authors,
        publisher,
        translators,
        thumbnail_url,
        isbn,
        total_page,
        meta: {
            requestId: ctx.state.requestId,
            now: +new Date(),
        },
    };

    ctx.body = await bookShelfService.registerBook(bookData);
};

module.exports = {
    bookShelfController,
};
