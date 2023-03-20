const pgClient = require('../connections/postgresql')

class BookHistoryRepository {
    constructor(){
        this._repositoryName = 'BookHistoryRepository'
    }
    get name(){
        return this._repositoryName
    }


    async getBookHistoryListByBookId(bookId){
        // 같은 column 이름을 구분하기 위해 deleted_at에 alias 설정
        const query = pgClient.select('*')
                        .from('tbl_mybook as tb')
                        .join('tbl_myhistory as th', 'tb.id','=','th.mybook_id')
                        .where('tb.id', bookId)
                        .whereNull('tb.deleted_at')
                        .whereNull('th.deleted_at')
                        .first()

        return await query
    }

    async getBookHistoryCountByAccountId(accountId){
        const query = pgClient
                        .from('tbl_myhistory as th')
                        .where('th.user_id', accountId)
                        .count()
                        .first()
        return await query
    }
}

module.exports = {
    BookHistoryRepository
}