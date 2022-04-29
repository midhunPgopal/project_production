const mongoose = require('mongoose')

const UserDetailsSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    proffession: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('UserDetails', UserDetailsSchema)