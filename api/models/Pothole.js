const mongoose = require('mongoose')

const potholeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    dimensions: {
        type: Array
    },
    address: {
        type: String
    },
    location: {
        type: Array
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    cost: {
        type: Number
    }
})

module.exports = mongoose.model('Pothole', potholeSchema)