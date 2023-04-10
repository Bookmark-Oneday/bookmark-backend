const { healthcheckService, versionService, MissingRequestPatameter} = require('../services')

const healthcheck = async (ctx)=>{
    const heapInfo = await(new healthcheckService()).getHeapStatistics()
    const versionInfo = (new versionService()).version
    
    ctx.body = {
        version : versionInfo,
        heapInformation : heapInfo,
    }

    console.log('parameter : \n', ctx.request.query, Object.keys(ctx.request.query).length)

    if(ctx.request.query.historyId){
        console.log('existed')
    }
}

const exceptionCheck = async (ctx)=>{
    const {
        host,
    } = ctx
    throw new MissingRequestPatameter('required parameter : ', host)
}

module.exports = { healthcheck, exceptionCheck }