const {
    MyListDao
  } = require("../dao/mylistDao");

  const validator = require('validator')
  const { InvalidUUID, AccountNotFound, MyBookNotFound } = require('./errorService');

class MyListService {
    constructor(){
        this._serviceName = 'mylistService'
    }

    get serviceName(){
        return this._serviceName
    }

    async getMyList(userId, sortType, perPage, continuousToken){
      
        const myListDao = new MyListDao()

        const myList = await myListDao.getMyList(userId, sortType, perPage, continuousToken)
        
        return myList
    }

}

module.exports = { MyListService }