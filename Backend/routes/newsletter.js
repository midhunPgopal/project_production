const router = require('express').Router()
const Newsletter = require('../models/Newsletter')

router.post('/', async (req, res) => {
    const {email} = req.body
    const existingEmail = await Newsletter.findOne({ email })
    if (existingEmail) {
        return res.status(400).json({ msg: 'Already subscribed' })
    }
    const newEmail = new Newsletter({email})
    try {
        await newEmail.save()
        res.status(200).json({msg: 'Email id added'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router