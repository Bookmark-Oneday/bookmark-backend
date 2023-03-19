const { getTimezoneDate, isSameDay, getYMDHMS } = require('../utils/timezoneDate')

class BookTimerDecorator {
    constructor(){
        this._serviceName = 'BookTimerDecorator'
    }

    get serviceName(){
        return this._serviceName
    }

    decorateBookTimer(bookId, {userInfo, historyInfo}){

        let dailyTime = 0
        // 오늘 날짜 계산 yyyy-mm-dd format
        const now = getTimezoneDate()
        const history = historyInfo.map(item=>{
            const itemDate = getTimezoneDate(item.created_at)
            
            if(isSameDay(now, itemDate)){
                dailyTime += item.reading_time
            }
            return {
                id: item.id,
                date: getYMDHMS(itemDate),
                time: item.reading_time
            }
        })

        const data = {
            "user_id": userInfo.user_id,
            "target_time": userInfo.target_read_time,
            "daily": dailyTime, // 오늘 모든 책을 읽은 전체 시간
            "book":{
                "book_id": bookId,
                "history": history
            }
        }

        return data
    }



}

module.exports = { BookTimerDecorator }