const pgClient = require('../connections/postgresql')

class MyListRepository {
    constructor(){
        this._repositoryName = 'MyListRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getMyList(sortType, perPage, continuousToken) {
      // continuousToken은 이전 페이지의 수.
      // offset: 전체 데이터에서 현재 페이지에 해당하는 데이터의 인덱스 값 0부터 시작, 값이 존재하면 continuousToken 아니면 0
      const offset = continuousToken ? parseInt(continuousToken) * parseInt(perPage)  : 0;
      // const offset = continuousToken ? parseInt(continuousToken)  : 0;

      // 데이터의 총 개수 구하기
      const countQuery = pgClient('tbl_mybook').count();

      const query = pgClient('tbl_mybook')
                    .select('id as book_id', 'title', 'authors', 'translators', 'publisher', 'thumbnail_url as titleImage', 'reading', 'favorite');

      // sortTyple 별로 출력, limit: 조회할 데이터의 개수 지정, offset: 조회할 데이터의 시작 위치를 지정 
      // -> offset번째 데이터부터 perPage 개수만큼의 데이터를 조회
      if (sortType === 'latest') {
        query.orderBy('updated_at', 'desc').limit(perPage).offset(offset);
      } else if (sortType === 'past') {
        query.orderBy('updated_at', 'asc').limit(perPage).offset(offset);
      } else if (sortType === 'favorite') {
        query.andWhere('favorite', true).orderBy('updated_at', 'desc').limit(perPage).offset(offset);
      } else if (sortType === 'reading') {
        query.andWhere('reading', true).orderBy('updated_at', 'desc').limit(perPage).offset(offset);
      }

    const [countResult, dataResult] = await Promise.all([countQuery, query]);
    
    // totalCount가 undefined일 때 0으로 설정
    const totalCount = parseInt(countResult[0].count) || 0;

    // 현재 페이지는 현재 페이지
    const currentPage = Math.floor((offset / parseInt(perPage))) + 1;

    // 총 페이지는 데이터 개수를 perPage로 나누고 올림한 값
    const maxPage = Math.ceil(totalCount / parseInt(perPage));

    return {
      data: dataResult,
      meta: {
        totalCount: totalCount,
        currentPage: currentPage,
        maxPage: maxPage,
        sortType: sortType,
        perPage: perPage,
        continuousToken: continuousToken,
      },
    };
      }

    async getBookInfo(bookId){
        const query = pgClient.select('id as book_id', 'title', 'authors as author', 'translators', 'publisher', 'thumbnail_url as titleImage', 'current_page', 'total_page', 'meta')
                        .from('tbl_mybook as tb')
                        .where('tb.id', bookId)
        return await query
    }
}

module.exports = {
    MyListRepository,
}