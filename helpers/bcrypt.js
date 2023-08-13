const bcrypt = require('bcrypt');

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8))
}

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }