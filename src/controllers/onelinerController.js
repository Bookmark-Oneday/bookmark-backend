const { OnelinerService } = require('../services')


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
  
  const result = await onelinerService.postOneliner(userId, book_id,
    title,
    authors,
    oneliner,
    color,
    top,
    left,
    font,
    font_size,
    bg_image_url);

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

module.exports = { 
    postOneliner
}