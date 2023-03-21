const { PostingRepository } = require("./repositories/postingRepository");

class PostingDao {
    constructor() {
        this._daoName = "AccountDao";
    }

    get daoName() {
        return this._daoName;
    }

    async getPosingListByUserId(userId) {
        const postingRepo = new PostingRepository();
        const postingList = await postingRepo.getPostingList(userId);
        const result = {
            data: postingList,
        };
        return result;
    }

    async getPosingList() {
        const postingRepo = new PostingRepository();
        const postingList = await postingRepo.getPostingList();
        const result = {
            data: postingList,
        };
        return result;
    }
}

module.exports = { PostingDao };
