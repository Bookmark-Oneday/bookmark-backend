const pgClient = require('../connections/postgresql')

class AccountRepository {
    constructor(){
        this._repositoryName = 'AccountRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getAccountById(userId){
        const query = pgClient.select('*').from('tbl_account').where('tbl_account.id', userId)
        return await query
    }

    async getAccountByBookId(bookId){
        const query = pgClient.select('*')
                        .from('tbl_account as ta').join('tbl_mybook as tb', 'ta.id','=','tb.user_id')
                        .where('tb.id', bookId).whereNull("ta.deleted_at").whereNull("tb.deleted_at")
        return await query
    }

    
}

module.exports = {
    AccountRepository,
}