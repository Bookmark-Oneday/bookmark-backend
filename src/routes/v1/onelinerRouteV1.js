const Router = require("koa-router");
const onelinerController = require("../../controllers/onelinerController");

const onelinerRouteAPIV1 = (root)=>{
    const router = Router();

    router.post('/', onelinerController.postOneliner); 

    root.use('/oneliner', router.routes())
}

const onelinerRouteV1 = (root)=>{
    onelinerRouteAPIV1(root)
}
module.exports = { onelinerRouteV1 }