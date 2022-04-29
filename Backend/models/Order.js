const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }, 
    total : {
        type: Number, 
        required: true
    },
    deliveryAddress : {
        type: Object, 
        required: true
    },
    payment : {
        type: String, 
        required: true
    },
    status : {
        type: String, 
        default: 'Pending'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)