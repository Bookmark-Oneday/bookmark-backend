const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { AccountRepository } = require('./repositories/accountRepository')
const { BookTimerDecorator } = require('./bookTimerDecorator')
const { MyBookNotFound, InternalServerError } = require('../services/errorService')

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
        if (!accountInfo || !bookHistoryInfo){
            throw new MyBookNotFound(bookId)
        }

        const bookTimerInfo = await bookTimerDecorator.decorateBookTimer(accountInfo, bookHistoryInfo)

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