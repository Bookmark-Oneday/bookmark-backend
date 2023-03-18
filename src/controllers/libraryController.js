const { MyListService } = require('../services')

const getMyList = async (ctx) => {
  const { sortType = 'latest', perPage = 3, continuousToken = 0 } = ctx.query; // 첫 페이지를 0으로 함

  const mylistService = new MyListService();
  const result = await mylistService.getMyList(sortType, perPage, continuousToken);
  
  ctx.body = {
    data: result.data_meta.data,
    meta: {
       sortType: sortType,
       continuousToken: continuousToken || '0',
       index: result.data_meta.meta.currentPage,
       totalCount: result.data_meta.meta.totalCount,
       requestId: ctx.state.requestId,
       now: +new Date(),
    },
  };
};

const getBookInfo = async (ctx)=>{
    const {
        params: {
            bookId
        }
    } = ctx
    //const uuid = req.get('UUID');
    const bookinfoService = new MyListService()
    
    if(bookId){
        ctx.body = await bookinfoService.getBookInfo(bookId)
    }

    
}

module.exports = { 
    getMyList,
    getBookInfo
}