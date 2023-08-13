const jwt = require('jsonwebtoken');
const secret = 'rahasia'

const createToken = (payload) => {
  return jwt.sign(payload, secret)
}

const decodeToken = (token) => {
  return jwt.verify(payload, secret)
}

module.exports = { createToken, decodeToken }