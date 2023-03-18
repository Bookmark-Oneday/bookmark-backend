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
    // async getMyList(sortType){
    //     const MyListRepo = new MyListRepository()
    //     //const bookHistoryRepo = new BookHistoryRepository()
    //     //const bookInfoDecorator = new BookInfoDecorator()

    //     const myList = await MyListRepo.getMyList(sortType)
    //     //const bookHistoryInfo = await bookHistoryRepo.getBookHistoryListByBookId(bookId)
    //     //const bookDetailInfo = await bookInfoDecorator.decorateBookInfo(bookInfo, bookHistoryInfo)
    //     //console.log("myList입니다", myList)
    //     const results = {
    //         data :  myList
    //     }
    //     return results
    // }

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