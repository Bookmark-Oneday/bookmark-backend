const validator = require('validator')
const { InvalidUUID, AccountNotFound, MyBookNotFound } = require('./errorService')
const { BookTimerDao } = require('../dao/bookTimerDao')

class BookTimerService {
    constructor(){
        this._serviceName = 'BookTimerService'
    }

    get serviceName(){
        return this._serviceName
    }

    async getTimerByBookId(bookId){

        // uuid type check
        if (!validator.isUUID(bookId)){
            throw new InvalidUUID(bookId)
        }

        const bookTimerDao = new BookTimerDao()

        const bookTimerInfo = await bookTimerDao.getBookTimerInfoByBookId(bookId)

        return bookTimerInfo
    }


}

module.exports = { BookTimerService }