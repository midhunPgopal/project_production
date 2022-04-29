const router = require('express').Router()
const User = require('../models/User')
const ReferalCode = require('../models/ReferralCode')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const serviceSID = process.env.serviceSID
const accountSId = process.env.accountSID
const authToken = process.env.authToken

const client = require('twilio')(accountSId, authToken)

//for register

router.post('/register', async (req, res) => {
    try {
        let { name, username, email, mobile, password, cpassword } = req.body
        //validation
        if (password !== cpassword) {
            return res.status(400).json({ password: 'Password doesnt match' })
        }
        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ username: 'Username already exists' })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ user: 'User already exists' })
        }
        const newReferal = new ReferalCode({
            username,
            referalCode: Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 8)
        })
        const ref = await ReferalCode.findOne({ referalCode: req.body.referal })
        let newUser = null
        if (ref) {
            newUser = new User({
                name,
                username,
                email,
                mobile,
                wallet: 50,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
            })
        } else {
            newUser = new User({
                name,
                username,
                email,
                mobile,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
            })
        }
        await newUser.save()
        await newReferal.save()
        res.status(200).json({ msg: 'User created' })
    } catch (error) {
        console.log(error);
    }
})

//for login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(400).json({ user: 'User not found' })
        }
        if (!user.status) {
            return res.status(400).json({ user: 'User is Blocked' })
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (originalPassword !== req.body.password) {
            return res.status(400).json({ password: 'Password incorrect' })
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ user, accessToken })
    } catch (error) {
        console.log(error);
    }
})

router.post('/otplogin', async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.body.mobile })
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }
        if (!user.status) {
            return res.status(400).json({ msg: 'User is Blocked' })
        }
        client.verify.services(serviceSID)
            .verifications.create({
                to: `+91${req.body.mobile}`,
                channel: 'sms'
            })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/otpverify', async (req, res) => {
    const { mobile, otp } = req.body
    const user = await User.findOne({ mobile })
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    client.verify.services(serviceSID)
        .verificationChecks.create({
            to: `+91${mobile}`,
            code: otp
        }).then(resp => {
            if (res.status === 'approved') {
                res.status(200).json({ user, accessToken })
            }
            else {
                res.status(401).json({ msg: 'Token not validated' })
            }
        }).catch(err => console.log(err))
})

module.exports = router