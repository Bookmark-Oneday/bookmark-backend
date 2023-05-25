class OnelinerDecorator {
    constructor(){
        this._serviceName = 'OnelinerDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    async decorateOneliner(oneliner, totalCount, currentPage, maxPage, sortType, perPage, continuousToken){
        const data = {
            data: oneliner.dataResult,

            meta: {
            totalCount: totalCount,
            currentPage: currentPage,
            maxPage: maxPage,
            sortType: sortType,
            perPage: perPage,
            continuousToken: continuousToken,
            }
        }
        return data
    }



}

module.exports = { OnelinerDecorator }