const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { AccountRepository } = require('./repositories/accountRepository')
const { BookTimerDecorator } = require('./bookTimerDecorator')
const { MyBookNotFound } = require('../services/errorService')

class BookTimerDao {
    constructor(){
        this._daoName = 'BookTimerDao'
        this._repo = {
            bookHistory: new BookHistoryRepository(),
            account: new AccountRepository(),
        }
    }

    get daoName(){
        return this._daoName
    }

    async getBookTimerInfoByBookId(bookId){
        const bookTimerDecorator = new BookTimerDecorator()

        const [accountInfo, bookHistoryInfo] = await Promise.all([
            this._repo.account.getAccountByBookId(bookId),
            this._repo.bookHistory.getBookHistoryListByBookId(bookId)
        ])
        // deleted book check
        if (!accountInfo || !bookHistoryInfo){
            throw new MyBookNotFound(bookId)
        }

        const bookTimerInfo = bookTimerDecorator.decorateBookTimer(bookId, {accountInfo, bookHistoryInfo})

        const result = {
            data : bookTimerInfo
        }
        return result
    }
}

module.exports = { BookTimerDao }