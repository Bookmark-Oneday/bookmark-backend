const { LastPageService } = require("../services");
const { MissingRequestParameter } = require("../services/errorService");

const lastPageController = async (ctx) => {
    const { bookId } = ctx.params;

    const lastPageService = new LastPageService();

    if (bookId) {
        const { current_page, total_page } = ctx.request.body;

        // check current_page value
        if (!current_page) {
            throw new MissingRequestParameter("current_page");
        }
        // check total_page value
        if (!total_page) {
            throw new MissingRequestParameter("total_page");
        }

        ctx.body = await lastPageService.updateLastPage(
            bookId,
            current_page,
            total_page
        );
    }
};

module.exports = {
    lastPageController,
};
