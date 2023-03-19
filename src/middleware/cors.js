const corsMiddleware = async (ctx, next)=>{
    if(ctx.method === 'OPTIONS'){
        if (!ctx.get('Access-Control-Requrest-Method')){
            await next()
        }
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set('Access-Control-Allow-Credentials', 'true')
        ctx.set('Access-Control-Allow-Methods', 'GET')
        ctx.set('Access-Control-Allow-Headers', '*')
        ctx.status = 204
    }else{
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.set('Access-Control-Allow-Credentials', 'true')
        ctx.set('Vary', 'Origin')
        await next();
    }
}
module.exports = {
    corsMiddleware,
}