const router = require('express').Router()
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
const Banner = require('../models/Banner')
const verifyStatus = require('../middleware/verifyStatus')
const cloudinary = require('../middleware/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '/uploads/banner'
    }
})
const upload = multer({ storage: storage })

router.get('/', verifyStatus, async (req, res) => {
    try {
        const banner = await Banner.find()
        res.status(200).json(banner)
    } catch (error) {
        console.log(error);
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id)
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get/:code', async (req, res) => {
    try {
        const data = await Banner.find({ offerCode: req.params.code })
        const [banner] = data
        res.status(200).json(banner)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post('/', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    let { title, description, offerDescription, offerCode, discount, bg } = req.body
    const newBanner = new Banner({
        title,
        description,
        offerDescription,
        offerCode,
        discount,
        img: req.file.path,
        bg
    })
    try {
        const existBanner = Banner.find({ offerCode })
        if (existBanner[0]) {
            return res.status(200).json({ msg: 'This offer code already exist' })
        }
        await newBanner.save()
        res.status(200).json({ msg: 'Banner created' })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    let { title, description, offerDescription, offerCode, discount, bg } = req.body
    let updatedBanner = null
    if (req.file) {
        updatedBanner = {
            title,
            description,
            offerDescription,
            offerCode,
            discount,
            bg,
            img: req.file.path
        }
    } else {
        updatedBanner = {
            title,
            description,
            offerDescription,
            offerCode,
            discount,
            bg
        }
    }
    try {
        await Banner.findByIdAndUpdate(req.params.id, {
            $set: updatedBanner
        }, { new: true })
        res.status(200).json({ msg: 'Banner updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router