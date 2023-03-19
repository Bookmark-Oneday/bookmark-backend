

class BookTimerDecorator {
    constructor(){
        this._serviceName = 'BookTimerDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    async decorateBookTimer(userInfo, historyInfo){

        let history = new Array()
        let daily = 0

        // today date, format: yyyy-mm-dd 
        const date = new Date()
        const today = date.getFullYear() + '-' + ('0'+(date.getMonth() + 1)).slice(-2) + '-' + date.getDate()

        // history array
        for (const h of historyInfo){

            // if created_at == today, add daily time
            if (h.created_at.toISOString().split('T')[0] == today ){
                daily += h.reading_time
            }
            
            history.push({"id": h.id, 
                        "date": h.created_at.toISOString().split('T')[0],
                        "time": h.reading_time})
            
        }

        const data = {
            "user_id": userInfo.user_id,
            "target_time": userInfo.target_read_time,
            "daily": daily, 
            "book":{
                "book_id": historyInfo[0].mybook_id,
                "history": history
            }
        }

        return data
    }

    



}

module.exports = { BookTimerDecorator }