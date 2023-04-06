const Router = require("koa-router");
const BookShelfController = require("../../controllers/bookShelfController");

const bookShelfAPIV1 = (root) => {
    const router = Router();
    router.post("/book", BookShelfController.bookShelfController);
    root.use("/library/mylist", router.routes());
};

const bookShelfRouteV1 = (root) => {
    bookShelfAPIV1(root);
};

module.exports = { bookShelfRouteV1 };
