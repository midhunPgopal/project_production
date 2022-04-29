const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

router.post('/login', async (req, res) => {
    try {
        const admin = await User.findOne({ username: req.body.username })
        if (!admin) {
            return res.status(400).json({ admin: 'Admin not found' })
        }
        if(!admin.isAdmin) {
            return res.status(400).json({ admin: 'You are not authenticated' })
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            admin.password,
            process.env.PASS_SECRET
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (originalPassword !== req.body.password) {
            return res.status(400).json({ password: 'Password incorrect' })
        }
        const accessToken = jwt.sign({
            id: admin._id,
            isAdmin: admin.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ admin, accessToken })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router