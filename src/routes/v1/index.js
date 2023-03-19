const Router = require('koa-router')
const { boardRouteV1 } = require('./boardRouteV1')
const { accountRouteV1 } = require('./accountRouteV1')
const { adminRouteV1 } = require('./adminRouteV1')
const { bookTimerRouteV1 } = require('./bookTimerRouteV1')

const V1 = ()=>{
    const router = Router()
    boardRouteV1(router)
    accountRouteV1(router)
    adminRouteV1(router)
    bookTimerRouteV1(router)

    return router
}

module.exports = { V1 }