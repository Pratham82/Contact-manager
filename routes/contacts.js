const express = require("express")
const router = express.Router()

//@route GET api/conatcts
//@desc
//@access Private
router.get("/", (req, res) => res.send("Get all contacts"))

//@route POST api/auth
//@desc Add new contact
//@access Private
router.post("/", (req, res) => res.send("Add new contact"))

//@route PUT api/auth
//@desc  Update contact
//@access Private
router.put("/:id", (req, res) => res.send("Update contact"))

//@route PUT api/auth
//@desc  Delete the contact
//@access Public
router.delete("/:id", (req, res) => res.send("Delete contact"))

module.exports = router
