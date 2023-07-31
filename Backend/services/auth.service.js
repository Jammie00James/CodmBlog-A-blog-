const config = require('../config.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const util = require('util')


async function makeToken(id) {
    try {
        // Create a JWT token
        const token = jwt.sign({ id: id }, config.JWT_SECRET_KEY, { expiresIn: '24h' });
        return token;
    } catch (error) {
      console.error (error);
    }
  
}

async function checkToken(token) {
  try {
    const verifyToken = util.promisify(jwt.verify);
    const decoded = await verifyToken(token, config.JWT_SECRET_KEY);
    return decoded.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function checkPassword(hashed, raw) {
    try {
      const result = await bcrypt.compare(raw, hashed);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

module.exports = {makeToken, checkPassword, checkToken}