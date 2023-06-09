const { OnelinerRepository } =  require('./repositories/onelinerRepository')
const { OnelinerDecorator } = require('./onelinerDecorator')

class OnelinerDao {
    constructor(){
        this._daoName = 'OnelinerDao'
    }

    get daoName(){
        return this._daoName
    }


    async getOneliner(userId, sortType, perPage, continuousToken){
        const OnelinerRepo = new OnelinerRepository()
        const onelinerDecorator = new OnelinerDecorator()

        // continuousToken: 이전 페이지의 수

        // offset: 전체 데이터에서 현재 페이지에 해당하는 데이터의 인덱스 값 0부터 시작, 값이 존재하면 continuousToken 아니면 0
        const offset = continuousToken ? parseInt(continuousToken) * parseInt(perPage)  : 0;

        const oneliner = await OnelinerRepo.getOneliner(offset,perPage)
        
        // totalCount: 오늘 한줄에 올라온 게시글의 총 개수 
        const totalCount = parseInt(oneliner.countResult.count) || 0;
        // currentPage: 현재 페이지
        const currentPage = Math.floor((offset / parseInt(perPage))) + 1;
        // maxPage(총 페이지): 데이터 개수를 perPage로 나누고 올림한 값
        const maxPage = Math.ceil(totalCount / parseInt(perPage));

        const onelinerInfo = await onelinerDecorator.decorateOneliner(oneliner, totalCount, currentPage, maxPage, sortType, perPage, continuousToken)

        const result = {
            data :  onelinerInfo.data,
            meta :  onelinerInfo.meta

        }
        return result
    }
}

module.exports = { OnelinerDao }