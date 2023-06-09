const { OnelinerService } = require('../services')
const { MissingRequestParameter } = require('../services/errorService')

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

const postOneliner = async (ctx) => {
  const userId = ctx.request.headers.user_id;

  const {
    book_id,
    title,
    authors,
    oneliner,
    color,
    top,
    left,
    font,
    font_size,
    bg_image_url
    } = ctx.request.body;

  const onelinerService = new OnelinerService();
  
  const result = await onelinerService.postOneliner({
    userId: userId,
    book_id: book_id,
    title: title,
    authors: authors,
    oneliner: oneliner,
    color: color,
    top: top,
    left: left,
    font: font,
    font_size: font_size,
    bg_image_url: bg_image_url
  });

  const data = { 
    oneliner: 
      result.data

  }
  const meta = {
    sortType: "latest",
    continuousToken: "0",
    currentPage: "0",
    requestId: ctx.state.requestId,
    now: +new Date(),
};

  ctx.body = {
    data: data,
    meta
  };
};

const deleteOneliner = async (ctx)=>{
  const {
      params: {
          onelinerId
      }
  } = ctx

  if (!onelinerId){
    throw new MissingRequestParameter('bookId')
  }

  const onelinerService = new OnelinerService();

  const result = await onelinerService.deleteOneliner(onelinerId);

  ctx.body = result;
  ctx.body.meta = {
      requestId: ctx.state.requestId,
      now: +new Date(),
  };
};

module.exports = { 
    getOneliner,
    postOneliner,
    deleteOneliner
}