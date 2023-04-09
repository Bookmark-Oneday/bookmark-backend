const Router = require("koa-router");
const LastPageController = require("../../controllers/lastPageController");

const lastPageAPIV1 = (root) => {
    const router = Router();
    router.post("/:bookId", LastPageController.lastPageController);
    root.use("/library/lastpage", router.routes());
};

const lastPageRouteV1 = (root) => {
    lastPageAPIV1(root);
};

module.exports = { lastPageRouteV1 };
