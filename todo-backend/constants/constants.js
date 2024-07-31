const crypto = require("crypto")
const SALT = crypto.randomBytes(32).toString('hex')
module.exports = SALT;