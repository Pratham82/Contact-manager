const mongoose = require("mongoose")
const config = require("config")
const db = config.get("mongoURI")

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log("Mongodb connnected ✅")
  } catch (e) {
    /* handle error */
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
