class BookInfoDecorator {
    constructor(){
        this._serviceName = 'BookInfoDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    async decorateBookInfo(bookInfo, historyInfo){

        let history = new Array()

        // history array
        for (const h of historyInfo){
            history.push({"id": h.id, 
                        "date": h.created_at.toISOString().split('T')[0],
                        "time": h.reading_time})
            
        } 

        const data = {
            "book_id": bookInfo[0].book_id,
            "title" : bookInfo[0].title,
            "authors" : bookInfo[0].authors,
            "translators" : bookInfo[0].translators,
            "publisher" : bookInfo[0].publisher,
            "titleImage" : bookInfo[0].image,
            "current_page" : bookInfo[0].current_page, 
            "total_page" : bookInfo[0].total_page,
            "history": history
        }

        return data
    }



}

module.exports = { BookInfoDecorator }