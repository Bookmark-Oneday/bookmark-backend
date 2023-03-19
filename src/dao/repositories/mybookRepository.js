const pgClient = require('../connections/postgresql')

class MyBookRepository {
    constructor(){
        this._repositoryName = 'MyBookRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getMyBookCountByAccountId(accountId){
        const query = pgClient
                        .from('tbl_mybook as tb')
                        .where('tb.user_id', accountId)
                        .whereNull("tb.deleted_at")
                        .count()
                        .first()
        return await query
    }
}

module.exports = {
    MyBookRepository
}