const { BookShelfService } = require("../services");

const bookShelfController = async (ctx) => {
    const bookShelfService = new BookShelfService();

    const {
        title,
        content,
        authors,
        publisher,
        translators,
        thumbnail,
        isbn,
        total_page,
    } = ctx.request.body;

    const user_id = ctx.request.headers.user_id;

    const meta = {
        requestId: ctx.state.requestId,
        now: +new Date(),
    };

    const updatedRows = await bookShelfService.registerBook(
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

    if (updatedRows) {
        ctx.status = 200;
        ctx.body = {
            code: 200,
        };
    } else {
        ctx.status = 404;
        ctx.body = {
            code: 404,
            message: "error",
        };
    }
};

module.exports = {
    bookShelfController,
};
