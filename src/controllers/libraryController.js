const { MyListService } = require('../services')

const getBookInfo = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx
    
    const bookinfoService = new MyListService()
    
    if(bookId){
        ctx.body = await bookinfoService.getBookInfo(bookId)
    }
    ctx.body.meta = {
        requestId: ctx.state.requestId,
        now: +new Date(),
    }
    
}

module.exports = { 
    //getMyList,
    getBookInfo
}