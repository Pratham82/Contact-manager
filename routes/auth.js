const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const User = require('../models/User')
const { check, validationResult } = require('express-validator')

//@route GET api/auth
//@desc  Get a logged in user
//@access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    /* handle error */
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

//@route POST api/auth
//@desc  Auth user and get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      // Check if the user present in the DB
      let user = await User.findOne({ email })

      // If the user does not exists in the DB send error message
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // If the user is present on the DB then compare the passwords
      const isMatched = await bcrypt.compare(password, user.password)

      // If te passowrd does not match then send error
      if (!isMatched) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      // If the credentials matches then send jwt token
      const payload = {
        user: {
          id: user.id,
        },
      }
      const secret = config.get('jwtSecret')

      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) {
          throw err
        } else {
          res.json({ token })
        }
      })
    } catch (e) {
      /* handle error */
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
