const crypto = require('crypto');
module.exports = function IDGenerator(){
    return crypto.randomBytes(4).toString('HEX');
}