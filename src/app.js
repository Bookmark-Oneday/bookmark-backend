const koa = require('koa')
const koaBody = require('koa-body')

const { config } = require('../deploy/config/config') 
const { initRouter } = require('./routes') 
const { log } = require('./utils/logging')

const { corsMiddleware, loggingMiddleware } = require('./middleware')

const app = new koa()
app.use(koaBody.koaBody())


// set middleware
app.use(corsMiddleware)
app.use(loggingMiddleware)

const router = initRouter()
app.use(router.routes())

log.info('Route initialized...');

app.listen(Number(config.App.PORT), () =>{
    log.info(` Start to listen on [${config.App.ENV} mode :${config.App.PORT}]`)
});

process.on('SIGINT', async function() {
    console.log("Caught interrupt signal");
    process.exit(0);
});

