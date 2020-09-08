const express = require('express')
require('./db/mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

dotenv.config()
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app