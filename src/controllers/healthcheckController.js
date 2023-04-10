const { healthcheckService, versionService, MissingRequestPatameter} = require('../services')

const healthcheck = async (ctx)=>{
    const heapInfo = await(new healthcheckService()).getHeapStatistics()
    const versionInfo = (new versionService()).version
    
    ctx.body = {
        version : versionInfo,
        heapInformation : heapInfo,
    }
}

const exceptionCheck = async (ctx)=>{
    const {
        host,
    } = ctx
    throw new MissingRequestPatameter('required parameter : ', host)
}

module.exports = { healthcheck, exceptionCheck }