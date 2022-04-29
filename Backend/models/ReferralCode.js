const mongoose = require('mongoose')

const ReferalCodeSchema = new mongoose.Schema({
    referalCode: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ReferalCode', ReferalCodeSchema)