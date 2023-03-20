const { BookTimerService } = require('../services')
const { MissingRequestParameter, InvalidRequestParameter } = require('../services/errorService')

const getBookTimer = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx

    if (!bookId){
        throw new InvalidRequestParameter('bookId')
    }

    const inst = new BookTimerService()
    ctx.body = await inst.getBookTimerByBookId(bookId)
}

const deleteReadingTime = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx

    if (!bookId){
        throw new InvalidRequestParameter('bookId')
    }
    if (!ctx.request.query || !ctx.request.query.historyId ){
        throw new InvalidRequestParameter('historyId')
    }

    const bookHistoryId = ctx.request.query.historyId
    const inst = new BookTimerService()
    ctx.body = await inst.removeReadingTime(bookId, bookHistoryId)
    ctx.body.meta = {
        requestId: ctx.state.requestId,
        now: +new Date(),
    }
}

const postReadingTime = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx

    if (!bookId){
        throw new InvalidRequestParameter('bookId')
    }
    if (!ctx.request.body || (!ctx.request.body.reading_time && ctx.request.body.reading_time != 0)){
        throw new MissingRequestParameter("reading_time")
    }
    const readingTime = 0 + ctx.request.body.reading_time
    if (readingTime < 0){
        throw new InvalidRequestParameter("readingTime")
    }

    const inst = new BookTimerService()
    ctx.body = await inst.addReadingTime(bookId, readingTime)
}

module.exports = { 
    getBookTimer,
    postReadingTime,
    deleteReadingTime,
}