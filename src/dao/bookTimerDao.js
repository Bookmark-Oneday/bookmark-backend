const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { AccountRepository } = require('./repositories/accountRepository')
const { BookTimerDecorator } = require('./bookTimerDecorator')
const { MyBookNotFound } = require('../services/errorService')

class BookTimerDao {
    constructor(){
        this._daoName = 'BookTimerDao'
    }

    get daoName(){
        return this._daoName
    }

    async getBookTimerInfoByBookId(bookId){
        const bookHistoryRepo = new BookHistoryRepository()
        const accountRepo = new AccountRepository()
        const bookTimerDecorator = new BookTimerDecorator()

        const accountInfo = await accountRepo.getAccountByBookId(bookId)
        const bookHistoryInfo = await bookHistoryRepo.getBookHistoryListByBookId(bookId)

        // deleted book check
        if (!accountInfo[0] || !bookHistoryInfo[0]){
            throw new MyBookNotFound(bookId)
        }

        const bookTimerInfo = await bookTimerDecorator.decorateBookTimer(accountInfo, bookHistoryInfo)

        const result = {
            data : bookTimerInfo
        }
        return result
    }
}

module.exports = { BookTimerDao }