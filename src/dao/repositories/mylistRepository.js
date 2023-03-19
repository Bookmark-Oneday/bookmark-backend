const pgClient = require('../connections/postgresql')

class MyListRepository {
    constructor(){
        this._repositoryName = 'MyListRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getBookInfo(bookId){
        const query = pgClient.select('id as book_id', 'title', 'authors', 'translators', 'publisher', 'thumbnail_url as image', 'current_page', 'total_page', 'meta')
                        .from('tbl_mybook as tb')
                        .where('tb.id', bookId).first()
        return await query
    }
}

module.exports = {
    MyListRepository,
}