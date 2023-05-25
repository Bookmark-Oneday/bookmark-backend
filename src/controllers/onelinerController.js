const { OnelinerService } = require('../services')


const getOneliner = async (ctx) => {
  const { sortType = 'latest', perPage = 5, continuousToken = 0 } = ctx.query; // 첫 페이지를 0으로 함
  const userId = ctx.request.headers.user_id;

  const onelinerService = new OnelinerService();

  const result = await onelinerService.getOneliner(userId, sortType, perPage, continuousToken);

  const { totalCount, currentPage} = result.meta;

  const data = { 
    oneliner: 
      result.data
    
  }

  const meta = {
    sortType,
    continuousToken,
    currentPage,
    totalCount,
    requestId: ctx.state.requestId,
    now: +new Date(),
};

  ctx.body = {
    data: data,
    meta
  };
};

module.exports = { 
    getOneliner
}