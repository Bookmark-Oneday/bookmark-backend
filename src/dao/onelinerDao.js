const { OnelinerRepository } =  require('./repositories/onelinerRepository')
const { OnelinerDecorator } = require('./onelinerDecorator')
const { OnelinerIdNotFound} = require('../services/errorService')

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
  
    async postOneliner(userId, book_id, title, authors,oneliner, color,top,left,font,font_size,bg_image_url){
        
        const OnelinerRepo = new OnelinerRepository();
        const userInfo = await OnelinerRepo.getUserInfoByUserId(userId);

        const profileImageUrlJSON = JSON.stringify(userInfo[0].profile_image_url);
        const nicknameJSON = JSON.stringify(userInfo[0].nickname);
        const authorsJSON = JSON.stringify(authors);

        const onelinerInfo = await OnelinerRepo.postOneliner(
            profileImageUrlJSON, 
            nicknameJSON, 
            userId, 
            book_id,
            title,
            authorsJSON,
            oneliner,
            color,
            top,
            left,
            font,
            font_size,
            bg_image_url)

        const onelinerInfoResult = await OnelinerRepo.getOnelinerInfoByBookId(onelinerInfo.book_id)

        const result = {
            data : onelinerInfoResult,
        }
        return result
    }
  
    async deleteOnelinerByOnelinerId(onelinerId){
        const OnelinerRepo = new OnelinerRepository()
        const onelinerIdIsValid = await OnelinerRepo.onelinerIdIsValid(onelinerId)
        if (!onelinerIdIsValid){
            throw new OnelinerIdNotFound(onelinerId)
        }
        const oneliner = await OnelinerRepo.deleteOnelinerByOnelinerId(onelinerId)
        
        const result = {
            deleteData :  onelinerId,
        }
        return result
    }
}

module.exports = { OnelinerDao }