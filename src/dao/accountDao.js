const { AccountRepository } = require('./repositories/accountRepository')
const { AccountNotFound } = require('../services/errorService')
const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { MyBookRepository } = require('./repositories/mybookRepository')
const { AccountDecorator } = require('./accountDecorator')
class AccountDao {
    constructor(){
        this._daoName = 'AccountDao'
        this._repo = {
            account: new AccountRepository(),
            bookHistory: new BookHistoryRepository(),
            mybook: new MyBookRepository(),
        }
        this._accountDecorator = new AccountDecorator()
    }

    get daoName(){
        return this._daoName
    }

    async getAccountInfo(accountId){
        const accountInfo = await this._repo.account.getAccountById(accountId)
        if ( accountInfo ) {
            throw new AccountNotFound({accountId})
        }

        const result = {
            data : {
                ...accountInfo,
            }
        }
        return result
    }

    async getAccountInfoByBookId(bookId){
        const accountInfo = await this._repo.account.getAccountByBookId(bookId)
        if ( !accountInfo ) {
            throw new AccountNotFound({bookId})
        }

        const result = {
            data : {
                ...accountInfo,
            }
        }
        return result
    }

    async getAccountInfoByOauthId(oauthId, oauthType){
        const accountInfo = await this._repo.account.getAccountByOauthId(oauthId, oauthType)
        if ( !accountInfo ) {
            throw new AccountNotFound({oauthId})
        }
        const bookHistoryInfo = await this._repo.bookHistory.getBookHistoryCountByAccountId(accountInfo.id)
        const mybookInfo = await this._repo.mybook.getMyBookCountByAccountId(accountInfo.id)

        const result = {
            data: this._accountDecorator.decorateAccountInfo({accountInfo, mybookInfo, bookHistoryInfo})
        }
        return result
    }
}

module.exports = { AccountDao }