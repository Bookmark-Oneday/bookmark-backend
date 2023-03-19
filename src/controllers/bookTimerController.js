const { BookTimerService } = require('../services')


const getBookTimer = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx

    const inst = new BookTimerService()

    if(bookId){
        ctx.body = await inst.getTimerByBookId(bookId)
    }
}


module.exports = { 
    getBookTimer
}