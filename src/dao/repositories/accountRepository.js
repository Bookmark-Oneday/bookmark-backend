const pgClient = require('../connections/postgresql')

class AccountRepository {
    constructor(){
        this._repositoryName = 'AccountRepository'
    }
    get name(){
        return this._repositoryName
    }

    async getAccountById(accountId){
        const query = pgClient.select('*')
                        .from('tbl_account')
                        .where('tbl_account.id', accountId)
                        .first()
        return await query
    }

    async getAccountByBookId(bookId){
        const query = pgClient.select('*')
                        .from('tbl_account as ta')
                        .join('tbl_mybook as tb', 'ta.id','=','tb.user_id')
                        .where('tb.id', bookId)
                        .whereNull("ta.deleted_at")
                        .whereNull("tb.deleted_at")
                        .first()
        return await query
    }

    async getAccountByOauthId(oauthId, oauthType){
        const query = pgClient.select('*')
                        .from('tbl_account as ta')
                        .where({
                            'ta.oauth_id': oauthId,
                            'ta.oauth_type': oauthType
                        })
                        .whereNull("ta.deleted_at")
                        .first()
        return await query
    }
    
}

module.exports = {
    AccountRepository,
}