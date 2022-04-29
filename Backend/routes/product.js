const router = require('express').Router()
const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
const Product = require('../models/Product')
const cloudinary = require('../middleware/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '/uploads'
    }
})
const upload = multer({ storage: storage })

//Creating

router.post('/', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    let { title, description, author, publisher, publishedAt, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer
    const img = req.file.path
    const newProduct = new Product({ title, description, author, publisher, publishedAt, img, categories, chapters, price, offers })
    try {
        const existProduct = await Product.find({ title })
        if (existProduct[0]) {
            return res.status(200).json({ msg: 'Product already exist' })
        }
        await newProduct.save()
        res.status(200).json({ msg: 'Product added' })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update product

router.put('/:id', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    let { title, description, author, publisher, publishedAt, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer
    let newProduct = null
    if (req.file) {
        newProduct = {
            title,
            description,
            author,
            publisher,
            publishedAt,
            img: req.file.path,
            categories,
            chapters,
            price,
            offers
        }
    } else {
        newProduct = {
            title,
            description,
            author,
            publisher,
            publishedAt,
            categories,
            chapters,
            price,
            offers
        }
    }
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: newProduct
        }, { new: true })
        res.status(200).json({ msg: 'Product updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete product

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get product

router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all products

router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})

//get latest products
router.get('/latest', async (req, res) => {
    try {
        const product = await Product.find().sort({ createdAt: -1 }).limit(3)
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/cat', async (req, res) => {
    const qCategory = req.query.category
    try {
        let product
        if (qCategory) {
            product = await Product.find({ categories: { $in: [qCategory] } })
        } else {
            product = await Product.find()
        }
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/offer', async (req, res) => {
    const qOffer = req.query.offer
    try {
        let product
        if (qOffer) {
            product = await Product.find({ offers: { $in: [qOffer] } })
        } else {
            product = await Product.find()
        }
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/search', async (req, res) => {
    const qSearch = req.query.search.trim()
    try {
        let product = null
        if (qSearch) {
            product = await Product.find({ $or: [{ title: { $regex: qSearch, $options: "i" } }] })
        } else {
            product = await Product.find()
        }
        res.status(200).json({dt: product})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router