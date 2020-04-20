const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// use .env config
require('dotenv').config()

// mongoose settings
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// connect to database
mongoose.connect(
    process.env.DATABASE_URL || 'mongodb://localhost/rims',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

// create an express instance
const app = express()

// use
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

// routes and endpoints
const archives = require('./routes/archives')
app.use('/api/archive', archives)

const assets = require('./routes/assets')
app.use('/api/asset', assets)

const potholes = require('./routes/potholes')
app.use('/api/pothole', potholes)

// start app
app.listen(process.env.SERVER_PORT || 3000, (err) => {
    if(err) throw err
    console.log(`Server is running on http://127.0.0.1:${process.env.SERVER_PORT}`)
})