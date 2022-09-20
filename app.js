const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
require('express-async-errors')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// server only start after connecting DB successfully
const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(port, () => console.log(`http://localhost:${port}/`))
}
start()
