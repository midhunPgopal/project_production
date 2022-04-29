const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    couponCode : {
        type: String,
        required: true
    },
    discount : {
        type: Number,
        required: true
    },
    maximumOfffer:{
        type: Number,
        requied: true
    },
    expiry: {
        type: Date,
        required: true
    },
    minimumAmount : {
        type: Number,
        required: true
    },
    users: {
        type: Array
    }
})

module.exports = mongoose.model('Coupon', CouponSchema)