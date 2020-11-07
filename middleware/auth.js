const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if the token is not present
  if (!token) {
    return res.status(401).json({ message: 'No token , authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (e) {
    /* handle error */
    res.status(401).json({ message: 'Token is not valid' })
  }
}
