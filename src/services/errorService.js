const { serviceError } = require('../utils/serviceError')

const errCodeString = {
    MissingParameter    : 'ERR-0001',
    InvalidParameter    : 'ERR-0002',
    InvalidUUID         : 'ERR-0003',
    UserNotFound        : 'ERR-0004',
    BookNotFound        : 'ERR-0005',
    InvalidOauthType    : 'ERR-0006',
    InvalidINT          : 'ERR-0007',
    ServerError         : 'ERR-0008',
    BookHistoryNotFound : 'ERR-0009'

}

class MissingRequestParameter extends serviceError {
    constructor(paramName){
        const message = `${paramName} is required`
        super(message, 400, errCodeString.MissingParameter)
        this.name = this.constructor.name
    }
}

class InvalidRequestParameter extends serviceError {
    constructor(paramName){
        const message = `Parameter is not valid : ${paramName}`
        super(message, 400, errCodeString.InvalidParameter)
        this.name = this.constructor.name
    }
}

class InvalidUUID extends serviceError {
    constructor(uuid){
        const message = `invalid UUID format : ${uuid}`
        super(message, 400, errCodeString.InvalidUUID)
        this.name = this.constructor.name
    }
}

class InvalidOauthType extends serviceError {
    constructor(oauthType){
        const message = `invalid oauth type : ${oauthType}`
        super(message, 400, errCodeString.InvalidOauthType)
        this.name = this.constructor.name
    }
}

class InvalidINT extends serviceError {
    constructor(number){
        const message = `invalid Number format : ${number}`
        super(message, 400, errCodeString.InvalidINT)
        this.name = this.constructor.name
    }
}


class AccountNotFound extends serviceError {
    constructor({accountId, bookId, oauthId}){
        const message = `Can not find account : [${accountId}, ${bookId}, ${oauthId}]`
        super(message, 400, errCodeString.UserNotFound)
        this.name = this.constructor.name
    }
    
}

class MyBookNotFound extends serviceError {
    constructor(bookId){
        const message = `Can not find book ${bookId}`
        super(message, 400, errCodeString.BookNotFound)
        this.name = this.constructor.name
    }    
    
}

class BookHistoryNotFound extends serviceError {
    constructor(bookHistoryId){
        const message = `Can not find book history ${bookHistoryId}`
        super(message, 400, errCodeString.BookHistoryNotFound)
        this.name = this.constructor.name
    }    

    
}

class InternalServerError extends serviceError {
    constructor(){
        const message = `Internal server error`
        super(message, 500, errCodeString.ServerError)
        this.name = this.constructor.name
    }
}

module.exports = {
    MissingRequestParameter,
    InvalidRequestParameter,
    InvalidUUID,
    AccountNotFound,
    MyBookNotFound,
    InvalidOauthType,
    InvalidINT,
    InternalServerError,
    BookHistoryNotFound

    
}