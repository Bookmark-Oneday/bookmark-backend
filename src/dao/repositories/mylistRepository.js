const pgClient = require('../connections/postgresql')

class MyListRepository {
    constructor(){
        this._repositoryName = 'MyListRepository'
    }
    get name(){
        return this._repositoryName
    }

    // async getMyList(sortType) {
    //     const query = pgClient.select('id as book_id', 'title', 'authors as author', 'translators', 'publisher', 'thumbnail_url as titleImage', 'reading', 'favorite', 'meta')
    //                     .from('tbl_mybook as tb')
      
    //     if (sortType === 'latest') {
    //       query.orderBy('created_at', 'desc');
    //     } else if (sortType === 'past') {
    //       query.orderBy('created_at', 'asc');
    //     } else if (sortType === 'favorite') {
    //       query.andWhere('favorite', false);
    //     } else if (sortType === 'reading') {
    //       query.andWhere('reading', true);
    //     }
    //     console.log("sortType입니다. ",sortType)

    //     // return await query
    //     const result = await query;
    //     return result;
    //   }

    async getBookInfo(bookId){
        const query = pgClient.select('id as book_id', 'title', 'authors', 'translators', 'publisher', 'thumbnail_url as image', 'current_page', 'total_page', 'meta')
                        .from('tbl_mybook as tb')
                        .where('tb.id', bookId)
        return await query
    }
}

module.exports = {
    MyListRepository,
}