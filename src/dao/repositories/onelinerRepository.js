const { result } = require('lodash');
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
    // 결과 호출을 위한 쿼리 
    async getOnelinerInfoByBookId(book_id){
        const query = pgClient.select('*')
                        .from('tbl_oneliner')
                        .where('tbl_oneliner.book_id', book_id)
        return query
    }
    // UserInfo를 가져오기 위한 쿼리 (profile_image, nickname)
    async getUserInfoByUserId(user_id){
        const query = pgClient.select('profile_image_url','nickname')
                        .from('tbl_account')
                        .where('tbl_account.id', user_id)
        return query
    }

    async postOneliner(
        profile_image_url, 
        nickname, 
        userId, 
        book_id,
        title,
        authors,
        oneliner,
        color,
        top,
        left,
        font,
        font_size,
        bg_image_url) {

        const query = pgClient('tbl_oneliner').insert({
            id: pgClient.raw("gen_random_uuid()"),
            user_id: userId,
            profile_image: profile_image_url,
            nickname: nickname,
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
        }).returning('book_id');
        const result = await query; // 쿼리 실행 및 결과 받기

        return result[0]; // book_id 반환
        }
  
    async onelinerIdIsValid(onelinerId){
        const query = pgClient('tbl_oneliner')
                                    .where('id', onelinerId)
                                    .select('*')
                                    .first();

        const result = await query
        return result;
    }
    async deleteOnelinerByOnelinerId(onelinerId) {
        const deletedAtUTC = new Date().toISOString();
        const deletedAtKST = new Date(new Date(deletedAtUTC).getTime() + (9 * 60 * 60 * 1000)).toISOString();

        const query = pgClient('tbl_oneliner')
                                .where('id', onelinerId)
                                .update('deleted_at', deletedAtKST);

        const result = await query
        return result;
    }
}

module.exports = {
    OnelinerRepository,
}