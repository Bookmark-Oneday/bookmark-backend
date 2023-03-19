const validator = require('validator')
const { InvalidUUID, InternalServerError } = require('./errorService')
const { BookTimerDao } = require('../dao/bookTimerDao')

class BookTimerService {
    constructor(){
        this._serviceName = 'BookTimerService'
    }

    get serviceName(){
        return this._serviceName
    }

    async getBookTimerByBookId(bookId){

        // uuid type check
        if (!validator.isUUID(bookId)){
            throw new InvalidUUID(bookId)
        }

        const bookTimerDao = new BookTimerDao()

        const bookTimerInfo = await bookTimerDao.getBookTimerInfoByBookId(bookId)

        return bookTimerInfo
    }

    async addReadingTime(bookId, readingTime){

        // uuid type check
        if (!validator.isUUID(bookId)){
            throw new InvalidUUID(bookId)
        }

        // number type check
        if (isNaN(readingTime)){
            throw new InvalidINT(readingTime)
        }

        const bookTimerDao = new BookTimerDao()

        // add new timer history
        const addedHistory = await bookTimerDao.postReadingTimeInfo(bookId, readingTime)

        const bookTimerInfo = await bookTimerDao.getBookTimerInfoByBookId(bookId)

        return bookTimerInfo
    }

    async removeReadingTime(bookId, bookHistoryId){

        // uuid type check
        if (!validator.isUUID(bookId)){
            throw new InvalidUUID(bookId)
        }

        if (bookHistoryId){
            if (!validator.isUUID(bookHistoryId)){
                throw new InvalidUUID(bookHistoryId)
            }
        }

        const bookTimerDao = new BookTimerDao()

        const bookTimerInfo = await bookTimerDao.getBookTimerInfoByBookId(bookId)

        let deleteHistory;


        if (bookHistoryId){
            deleteHistory = await bookTimerDao.deleteReadingTimeByHistoryId(bookId, bookHistoryId)
        }
        else{
            deleteHistory = await bookTimerDao.deleteReadingTimeByBookId(bookId)
        }


        return bookTimerInfo
    }


}

module.exports = { BookTimerService }