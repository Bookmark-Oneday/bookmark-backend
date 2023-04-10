const Debugger = require('../utils/debugger')

class healthcheckService {
    constructor(){
        this._debugger = new Debugger()
    }

    async getHeapStatistics(){
        // this._debugger.createHeapSnapshot()
        return await this._debugger.getHeapStatistics()
    }
}

module.exports = {
    healthcheckService
}