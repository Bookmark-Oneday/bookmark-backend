const cors = require('./cors')
const logging = require('./logging')
module.exports = {
    ...cors,
    ...logging,
}