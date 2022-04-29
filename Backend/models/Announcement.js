const mongoose = require('mongoose')

const AnnouncementSchema = mongoose.Schema({
    announcement:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Announcement', AnnouncementSchema)