const { AccountRepository } = require('./repositories/accountRepository')
const { AccountNotFound } = require('../services/errorService')
class AccountDao {
    constructor(){
        this._daoName = 'AccountDao'
    }

    get daoName(){
        return this._daoName
    }

    async getAccountInfo(userId){
        const accountRepo = new AccountRepository()
        const accountInfo = await accountRepo.getAccountById(userId)
        if ( accountInfo.length <= 0 ) {
            throw new AccountNotFound(userId)
        }

        const result = {
            data : accountInfo
        }
        return result
    }

    async getAccountInfoByBookId(bookId){
        const accountRepo = new AccountRepository()
        const accountInfo = await accountRepo.getAccountByBookId(bookId)
        if ( accountInfo.length <= 0 ) {
            throw new AccountNotFound(userId)
        }

        const result = {
            data : accountInfo
        }
        return result
    }
}

module.exports = { AccountDao }