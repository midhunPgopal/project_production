const router = require('express').Router()
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')
const Announcement = require('../models/Announcement')
const verifyStatus = require('../middleware/verifyStatus')

router.get('/', verifyStatus, async (req, res) => {
    try {
        const announcement = await Announcement.find()
        res.status(200).json(announcement)
    } catch (error) {
        console.log(error);
    }
})

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newAnnouncement = new Announcement(req.body)
    try {
        await newAnnouncement.save()
        res.status(200).json({msg: 'Banner created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Announcement.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({msg: 'Product updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router