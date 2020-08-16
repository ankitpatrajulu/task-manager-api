const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

