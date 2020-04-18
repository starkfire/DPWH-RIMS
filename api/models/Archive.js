const mongoose = require('mongoose')

const archiveSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        max: 100
    },
    encodedName: {
        type: String,
        required: false,
        max: 100,
        default: null
    }
})

module.exports = mongoose.model('Archive', archiveSchema, 'Archives')