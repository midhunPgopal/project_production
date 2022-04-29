const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    productId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    details:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema)