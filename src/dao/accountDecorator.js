

class AccountDecorator {
    constructor(){
        this._serviceName = 'AccountDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    decorateAccountInfo({accountInfo, mybookInfo, bookHistoryInfo}){
        const data = {
            ...accountInfo,
            mybook_count : mybookInfo.count,
            history_count: bookHistoryInfo.count,
        }

        return data
    }
}

module.exports = { AccountDecorator }