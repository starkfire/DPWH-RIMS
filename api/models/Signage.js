const mongoose = require('mongoose')

const signageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: 'Signage'
    },
    value: {
        type: String
    },
    address: {
        type: String
    },
    lat: {
        type: mongoose.Types.Decimal128
    },
    lon: {
        type: mongoose.Types.Decimal128
    }
})

module.exports = mongoose.model('Signage', signageSchema)