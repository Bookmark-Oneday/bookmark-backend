const { LastPageService } = require("../services");

const lastPageController = async (ctx) => {
    const { bookId } = ctx.params;

    const lastPageService = new LastPageService();

    if (bookId) {
        const { current_page, total_page } = ctx.request.body;
        const updatedRows = await lastPageService.updateLastPage(
            bookId,
            current_page,
            total_page
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
    }
};

module.exports = {
    lastPageController,
};
