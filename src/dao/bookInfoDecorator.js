class BookInfoDecorator {
    constructor(){
        this._serviceName = 'BookInfoDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    async decorateBookInfo(bookInfo, historyInfo){
        const data = {
            "book_id": bookInfo.book_id,
            "title" : bookInfo.title,
            "authors" : bookInfo.authors,
            "translators" : bookInfo.translators,
            "publisher" : bookInfo.publisher,
            "titleImage" : bookInfo.image,
            "current_page" : bookInfo.current_page, 
            "total_page" : bookInfo.total_page,
            "history": historyInfo.map(item=>({id: item.id, date: new Date(item.created_at).toISOString(), time: item.reading_time}))
        }  
        return data
    }
}

module.exports = { BookInfoDecorator }