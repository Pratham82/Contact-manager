const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

//@route POST api/users
//@desc Register a user
//@access Public users
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please enter  and email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      // If the user exitst
      if (user) {
        return res.status(400).json({ message: 'User already exists in DB' })
      }

      // If the user does not exists
      // Create user with given credentials
      user = new User({ name, email, password })

      // Generate salt for enrypting password
      const salt = await bcrypt.genSalt(10)

      // Hash the password
      user.password = await bcrypt.hash(password, salt)

      //Save the User to the DB
      await user.save()

      //Sending the token and payload for respective user
      const payload = { id: user.id }
      const secret = config.get('jwtSecret')
      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) {
          throw err
        } else {
          res.json({ token })
        }
      })
    } catch (e) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
