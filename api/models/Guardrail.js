const mongoose = require('mongoose')

const guardRailSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: 'GuardRail'
    },
    value: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: Array
    }  
})

module.exports = mongoose.model('GuardRail', guardRailSchema)