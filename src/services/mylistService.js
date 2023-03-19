const {
    MyListDao
  } = require("../dao/mylistDao");

  const validator = require('validator')
  const { InvalidUUID, AccountNotFound, MyBookNotFound } = require('./errorService');

class MyListService {
    constructor(){
        this._serviceName = 'mylistService'
    }

    get serviceName(){
        return this._serviceName
    }

    async getBookInfo(bookId){
      
        // uuid type check
        if (!validator.isUUID(bookId)){
            throw new InvalidUUID(bookId)
        }

        const bookInfoDao = new MyListDao()

        const bookInfo = await bookInfoDao.getBookInfo(bookId)
        
        // check if bookInfo exists
        if (!bookInfo) {
            throw new MyBookNotFound(bookId)
        }

        return bookInfo
}

}

module.exports = { MyListService }