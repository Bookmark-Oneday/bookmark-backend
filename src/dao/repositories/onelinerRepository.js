const pgClient = require('../connections/postgresql')

 class OnelinerRepository {
     constructor(){
         this._repositoryName = 'OnelinerRepository'
     }
     get name(){
         return this._repositoryName
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

    }

 module.exports = {
     OnelinerRepository,
 };