const express = require('express')
require('./db/mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

