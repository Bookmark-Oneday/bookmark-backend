const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { AccountRepository } = require('./repositories/accountRepository')
const { BookTimerDecorator } = require('./bookTimerDecorator')
const { MyBookNotFound, InternalServerError } = require('../services/errorService')

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

    async postReadingTimeInfo(bookId, reading_time){
        const accountRepo = new AccountRepository()
        const bookHistoryRepo = new BookHistoryRepository()

        const accountInfo = await accountRepo.getAccountByBookId(bookId)
        
        // deleted book check
        if (!accountInfo){
            throw new MyBookNotFound(bookId)
        }

        const postResult = await bookHistoryRepo.insertReadingTimeByBookId(accountInfo.user_id, bookId, reading_time)

        // postResult check
        if (!postResult || !postResult[0].hasOwnProperty('id')){
            throw new InternalServerError()
        }

        const addedBookHistoryResult = await bookHistoryRepo.getBookHistoryByBookHistoryId(postResult[0].id)

        // if id of added book history is not in table, throw error
        if (!addedBookHistoryResult){
            throw new InternalServerError()
        }

        const result = {
            data : addedBookHistoryResult
        }
        return result
    }
}

module.exports = { BookTimerDao }