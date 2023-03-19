const pgClient = require('../connections/postgresql')

class MyListRepository {
    constructor(){
        this._repositoryName = 'MyListRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getMyList(offset, userId, sortType, perPage) {
      // 데이터의 총 개수 구하기
      const countQuery = pgClient('tbl_mybook').where('user_id', userId).count().first();

      const query = pgClient('tbl_mybook').where('user_id', userId)
                    .select('id as book_id', 'title', 'authors', 'translators', 'publisher', 'thumbnail_url as titleImage', 'reading', 'favorite');

      // sortTyple 별로 출력, limit: 조회할 데이터의 개수 지정, offset: 조회할 데이터의 시작 위치를 지정 
      // -> offset번째 데이터부터 perPage 개수만큼의 데이터를 조회
      if (sortType === 'favorite') {
        query.andWhere('favorite', true)
      } else if (sortType === 'reading') {
        query.andWhere('reading', true)
      }
      query.orderBy('updated_at', (sortType === 'past'? 'asc':'desc'))
      query.limit(perPage).offset(offset);

      const [countResult, dataResult] = await Promise.all([countQuery, query]);

      return {
        countResult,
        dataResult
      };
      }
}

module.exports = {
    MyListRepository,
}