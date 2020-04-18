const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: Array
    },
    length: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Asset', assetSchema)