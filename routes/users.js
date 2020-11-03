const express = require("express")
const router = express.Router()

//@route POST api/users
//@desc Register a user
//@access Public users
router.post("/", (req, res) => {
  res.send("Registers a user")
})

module.exports = router
