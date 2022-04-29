const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        unique: true,
        required: true
    },
    product: {
        type: Object,
        requied: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Wishlist', WishlistSchema)