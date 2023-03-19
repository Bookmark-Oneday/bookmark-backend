const getTimezoneDate = (date)=>{
    const now = date? new Date(date):new Date()
    now.setTime(now.getTime() + (9 * 60 * 60 * 1000))   // Set Timezone  Asia/Seoul +09:00
    return now
}

const isSameDay = (src, desc)=>{
    if(src.getFullYear() === desc.getFullYear() && src.getMonth() === desc.getMonth() && src.getDate() === desc.getDate()){
        return true
    }
    return false
}

const getYMDHMS = (date)=>{
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    let second = date.getUTCSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getUTCFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

module.exports = {
    getTimezoneDate,
    isSameDay,
    getYMDHMS,
}