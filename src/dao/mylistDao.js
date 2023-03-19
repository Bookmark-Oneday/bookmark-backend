const { MyListRepository } =  require('./repositories/mylistRepository')
const { BookHistoryRepository } = require('./repositories/bookHistoryRepository')
const { MyListDecorator } = require('./myListDecorator')

class MyListDao {
    constructor(){
        this._daoName = 'MyListDao'
    }

    get daoName(){
        return this._daoName
    }

    async getMyList(userId, sortType, perPage, continuousToken){
        const MyListRepo = new MyListRepository()
        const myListDecorator = new MyListDecorator()

        // continuousToken: 이전 페이지의 수

        // offset: 전체 데이터에서 현재 페이지에 해당하는 데이터의 인덱스 값 0부터 시작, 값이 존재하면 continuousToken 아니면 0
        const offset = continuousToken ? parseInt(continuousToken) * parseInt(perPage)  : 0;

        const myList = await MyListRepo.getMyList(offset, userId, sortType, perPage)
        
        // totalCount: 해당 유저가 가지고 있는 책의 총 개수
        const totalCount = parseInt(myList.countResult.count) || 0;
        // currentPage: 현재 페이지
        const currentPage = Math.floor((offset / parseInt(perPage))) + 1;
        // maxPage(총 페이지): 데이터 개수를 perPage로 나누고 올림한 값
        const maxPage = Math.ceil(totalCount / parseInt(perPage));

        const myListInfo = await myListDecorator.decorateMyList(myList, totalCount, currentPage, maxPage, sortType, perPage, continuousToken)

        const result = {
            data :  myListInfo.data,
            meta :  myListInfo.meta
        }
        return result
    }
}

module.exports = { MyListDao }