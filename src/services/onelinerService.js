const {
    OnelinerDao
  } = require("../dao/onelinerDao");

  const validator = require('validator')
  const { InvalidUUID, AccountNotFound, MyBookNotFound } = require('./errorService');

class OnelinerService {
    constructor(){
        this._serviceName = 'onelinerService'
    }

    get serviceName(){
        return this._serviceName
    }

    async getOneliner(userId, sortType, perPage, continuousToken){
        
        // uuid type check
        if (!validator.isUUID(userId)){
            throw new InvalidUUID(userId)
        }

        const onelinerDao = new OnelinerDao()

        const oneliner = await onelinerDao.getOneliner(userId, sortType, perPage, continuousToken)
        
        return oneliner
    }


}

module.exports = { OnelinerService }