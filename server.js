const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5000

// Connect DB
connectDB()

//Init middleware
app.use(express.json({ extended: false }))

//Defining routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

/*app.get('/', (req, res) =>
  res.json({ message: 'Welcome to the Contact-manager API' })
)*/

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
