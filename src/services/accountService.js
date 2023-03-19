const validator = require('validator')
const { constants } = require('../../deploy/config/constant')
const { InvalidUUID, InvalidOauthType } = require('./errorService')
const { AccountDao } = require('../dao/accountDao')

class AccountService {
    constructor(){
        this._serviceName = 'UserService'
    }

    get serviceName(){
        return this._serviceName
    }

    _isValidOauthType(type){
        return constants.oauthType.includes(type.toLowerCase())
    }

    async getAccountByUserId(accountId){
        if (!validator.isUUID(accountId)){
            throw new InvalidUUID(accountId)
        }

        const accountDao = new AccountDao()
        return await accountDao.getAccountInfo(accountId)
    }

    async getAccountByOauthId(oauthId, oauthType){
        if (!validator.isUUID(oauthId)){
            throw new InvalidUUID(oauthId)
        }

        if(!this._isValidOauthType(oauthType)){
            throw new InvalidOauthType(oauthType)
        }

        
        
        const accountDao = new AccountDao()
        const accountInfo = await accountDao.getAccountInfoByOauthId(oauthId, oauthType)
        return accountInfo
    }

    async addNewAccount(){
    }

    async updateAccount(){
        
    }
    
    async deleteAccount(){
        
    }
}

module.exports = { AccountService }