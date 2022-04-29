const router = require('express').Router()
const UserDetails = require('../models/UserDetails')
const verifyStatus = require('../middleware/verifyStatus')
const cloudinary = require('../middleware/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '/uploads/users'
    }
})
const upload = multer({ storage: storage })

router.get('/:id', async (req, res) => {
    try {
        const userDetails = await UserDetails.find({ userId: req.params.id })
        res.status(200).json(userDetails)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', verifyStatus, upload.single('image'), async (req, res) => {
    let { userId, gender, proffession, dob } = req.body
    const newUserDetails = new UserDetails({
        userId,
        gender,
        proffession,
        dob,
        image: req.file.path
    })
    console.log(req.body)
    try {
        await newUserDetails.save()
        res.status(200).json({ msg: 'UserDetails created' })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyStatus, upload.single('img'), async (req, res) => {
    let { userId, gender, proffession, dob } = req.body
    let newDetails = null
    if(req.file) {
        newDetails = {
            userId,
            gender,
            proffession,
            dob,
            image: req.file.path
        }
    } else {
        newDetails = {
            userId,
            gender,
            proffession,
            dob
        }
    }
    try {
        await UserDetails.findOneAndUpdate({ userId: req.params.id }, {
            $set: newDetails
        }, { new: true })
        res.status(200).json({ msg: 'UserDetails updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router