const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

