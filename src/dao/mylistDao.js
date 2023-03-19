const { MyListRepository } =  require('./repositories/mylistRepository')
const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { BookInfoDecorator } = require('./bookInfoDecorator')
const { MyBookNotFound } = require('../services/errorService')

class MyListDao {
    constructor(){
        this._daoName = 'MyListDao'
    }

    get daoName(){
        return this._daoName
    }
    
    async getBookInfo(bookId){
        const MyListRepo = new MyListRepository()
        const bookHistoryRepo = new BookHistoryRepository()
        const bookInfoDecorator = new BookInfoDecorator()

        const bookInfo = await MyListRepo.getBookInfo(bookId)
        const bookHistoryInfo = await bookHistoryRepo.getBookHistoryListByBookId(bookId)

        // check if bookInfo exists
        if (!bookInfo){
            throw new MyBookNotFound(bookId)
        }

        const bookDetailInfo = await bookInfoDecorator.decorateBookInfo(bookInfo, bookHistoryInfo)

        const result = {
            data :  bookDetailInfo
        }
        return result
    }
}

module.exports = { MyListDao }