const uuid = require('uuid')
const { requestLogger } = require('../utils/logging')

const loggingMiddleware = async (ctx, next)=>{
    ctx.state.requestId = uuid.v4()
    try{
        await next()
    }catch(err){
        const errorObject = {
            ...err,
            message: err.message,
            trace: err.stack,
        }

        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            error: errorObject,
            meta: {
                requestId: ctx.state.requestId,
                now: +new Date(),
            },
        }

        requestLogger(ctx, {
            message: err.message,
            trace: err.stack,
        })
    }
}

module.exports = {
    loggingMiddleware,
}