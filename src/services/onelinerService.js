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
    
    async postOneliner(data) {
        const {
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
          bg_image_url
        } = data;
        
        // UUID type check
        if (!validator.isUUID(userId)) {
            throw new InvalidUUID(userId);
        }

        if (!validator.isUUID(book_id)) {
            throw new InvalidUUID(book_id);
        }

        const onelinerDao = new OnelinerDao();
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
          bg_image_url
        );
      
        return onelinerRows;
      }
      
}

module.exports = { OnelinerService };
