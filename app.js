const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use((req, res) => res.status(404).send('404 NOT FOUND'))

// server only start after connecting DB successfully
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`http://localhost:${port}/`))
  } catch (error) {
    console.log(error)
  }
}
start()
