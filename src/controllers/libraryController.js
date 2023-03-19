const { MyListService } = require('../services')

const getMyList = async (ctx) => {
  const { sortType = 'latest', perPage = 3, continuousToken = 0 } = ctx.query; // 첫 페이지를 0으로 함
  const userId = ctx.request.headers.user_id;

  const mylistService = new MyListService();

  const result = await mylistService.getMyList(userId, sortType, perPage, continuousToken);

  const { totalCount, currentPage} = result.meta;

  const meta = {
    sortType,
    continuousToken,
    currentPage,
    totalCount,
    requestId: ctx.state.requestId,
    now: +new Date(),
};

  ctx.body = {
    data: result.data,
    meta
  };
};

module.exports = { 
    getMyList,
}