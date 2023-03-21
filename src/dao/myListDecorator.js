class MyListDecorator {
    constructor(){
        this._serviceName = 'MyListDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    async decorateMyList(myList, totalCount, currentPage, maxPage, sortType, perPage, continuousToken){
        const data = {
            data: myList.dataResult,

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

module.exports = { MyListDecorator }