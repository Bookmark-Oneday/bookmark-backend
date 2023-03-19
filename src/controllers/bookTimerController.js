const { BookTimerService } = require('../services')
const { MissingRequestParameter, InvalidRequestParameter } = require('../services/errorService')



const getBookTimer = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx

    const inst = new BookTimerService()

    if(bookId){
        ctx.body = await inst.getBookTimerByBookId(bookId)
    }
}

const postReadingTime = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx


    if (!ctx.request.body || (!ctx.request.body.reading_time && ctx.request.body.reading_time != 0)){
        throw new MissingRequestParameter("reading_time")
    }

    const readingTime = ctx.request.body.reading_time

    if (readingTime < 0){
        throw new InvalidRequestParameter("readingTime")
    }

    const inst = new BookTimerService()

    if(bookId){
        ctx.body = await inst.addReadingTime(bookId, readingTime)
    }

    }

    const deleteReadingTime = async (ctx)=>{
        const {
            params: {
                bookId
            }
        } = ctx

        let bookHistoryId;

        if (ctx.request.query && ctx.request.query.historyId ){
            bookHistoryId = ctx.query.historyId
        }
    
        const inst = new BookTimerService()
    
        if(bookId){
            ctx.body = await inst.removeReadingTime(bookId, bookHistoryId)
            ctx.body.meta = {
                requestId: ctx.state.requestId,
                now: +new Date(),
            }
        }
        
    
}




module.exports = { 
    getBookTimer,
    postReadingTime,
    deleteReadingTime
}