const pgClient = require('../connections/postgresql')

class OnelinerRepository {
    constructor(){
        this._repositoryName = 'OnelinerRepository'
    }
    get name(){
        return this._repositoryName
    }
  
    async getOneliner(offset,perPage) {
      // 데이터의 총 개수 구하기
      const countQuery = pgClient('tbl_oneliner').count();

      const query = pgClient('tbl_oneliner')
                    .select('id', 'user_id', 'profile_image', 'nickname', 'book_id', 'title', 'authors', 'oneliner', 'color', 'top', 'left', 'font', 'font_size', 'bg_image_url', 'created_at');

      // sortType 별로 출력 (일단은 latest만), limit: 조회할 데이터의 개수 지정, offset: 조회할 데이터의 시작 위치를 지정 
      // -> offset번째 데이터부터 perPage 개수만큼의 데이터를 조회

      // 오늘 한줄은 작성일을 기준으로 해야한다. cf) past 도입 시, query.orderBy('created_at', (sortType === 'past'? 'asc':'desc'))
      query.orderBy('created_at', 'desc')
      query.limit(perPage).offset(offset);

      const [countResult, dataResult] = await Promise.all([countQuery, query]);

      return {
        countResult,
        dataResult
      };
      }
}

module.exports = {
    OnelinerRepository,
}