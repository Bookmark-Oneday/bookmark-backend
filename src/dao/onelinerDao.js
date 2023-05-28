const { OnelinerRepository } =  require('./repositories/onelinerRepository')

class OnelinerDao {
    constructor(){
        this._daoName = 'OnelinerDao'
    }

    get daoName(){
        return this._daoName
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
}

module.exports = { OnelinerDao } 