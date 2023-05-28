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

    async postOneliner(userId, book_id, title, authors, oneliner, color, top, left, font, font_size, bg_image_url){
        const onelinerDao = new OnelinerDao()
        const onelinerRows = await onelinerDao.postOneliner(
            userId, 
            book_id,
            title,
            authors,
            oneliner,
            color,
            top,
            left,
            font,
            font_size,
            bg_image_url)

        return onelinerRows
    }


}

module.exports = { OnelinerService };
