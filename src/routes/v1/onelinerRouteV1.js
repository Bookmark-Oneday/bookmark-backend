const Router = require("koa-router");
const onelinerController = require("../../controllers/onelinerController");

const onelinerRouteAPIV1 = (root)=>{
    const router = Router();
  
    router.post('/', onelinerController.postOneliner); 
    router.get('/', onelinerController.getOneliner); 
    router.delete('/:onelinerId', onelinerController.deleteOneliner)

    root.use('/oneliner', router.routes())
}

const onelinerRouteV1 = (root)=>{
    onelinerRouteAPIV1(root)
}

module.exports = { onelinerRouteV1 }
