const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Category', CategorySchema)