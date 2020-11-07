const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

//@route GET api/conatcts
//@desc
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    })
    res.json(contacts)
  } catch (e) {
    /* handle error */
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

//@route POST api/auth
//@desc Add new contact
//@access Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ erorrs: errors.array() })
    }

    const { name, email, phone, type } = req.body

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      })

      const contact = await newContact.save()

      res.json(contact)
    } catch (e) {
      /* handle error */
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route PUT api/auth
//@desc  Update contact
//@access Private
router.put('/:id', (req, res) => res.send('Update contact'))

//@route PUT api/auth
//@desc  Delete the contact
//@access Public
router.delete('/:id', (req, res) => res.send('Delete contact'))

module.exports = router
