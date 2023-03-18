const { MyListRepository } =  require('./repositories/mylistRepository')
const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { BookInfoDecorator } = require('./bookInfoDecorator')
//const { getMyList } = require('../controllers/libraryController')

class MyListDao {
    constructor(){
        this._daoName = 'MyListDao'
    }

    get daoName(){
        return this._daoName
    }

    async getMyList(sortType){
        const MyListRepo = new MyListRepository()

        const myList = await MyListRepo.getMyList(sortType)

        const result = {
            data :  myList
        }
        return result
    }

    async getBookInfo(bookId){
        const MyListRepo = new MyListRepository()
        const bookHistoryRepo = new BookHistoryRepository()
        const bookInfoDecorator = new BookInfoDecorator()

        const bookInfo = await MyListRepo.getBookInfo(bookId)
        const bookHistoryInfo = await bookHistoryRepo.getBookHistoryListByBookId(bookId)

        const bookDetailInfo = await bookInfoDecorator.decorateBookInfo(bookInfo, bookHistoryInfo)

        const result = {
            data :  bookDetailInfo
        }
        return result
    }
}

module.exports = { MyListDao }