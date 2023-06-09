const Router = require('koa-router')
const libraryController = require('../../controllers/libraryController')

const libraryRouteAPIV1 = (root)=>{
    const router = Router();

    router.get('/', libraryController.getMyList); 
    router.get('/:bookId', libraryController.getBookInfo);

    root.use('/library/mylist', router.routes())
}

const libraryRouteV1 = (root)=>{
    libraryRouteAPIV1(root)
}
module.exports = { libraryRouteV1 }