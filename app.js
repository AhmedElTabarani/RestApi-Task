const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')

const postRouter = require('./routes/post.routes.js')
const userRouter = require('./routes/user.routes.js')

const app = express()

dotenv.config({
  path: `${__dirname}/config/config.env`,
})

const port = process.env.PORT || 8080

app.use(express.json())

//Using Routes
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

// Connect to Database
mongoose.connect(
  process.env.dbURL,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
  () => {
    // Start the server
    app.listen(port, () =>
      console.log('> Server is running on http://localhost:' + port)
    )
  }
)
