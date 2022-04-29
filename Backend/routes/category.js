const router = require('express').Router()
const Category = require('../models/Category')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')
const cloudinary = require('../middleware/cloudinary')
const { CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: '/uploads/category'
    }
})
const upload = multer({storage: storage})

router.post('/', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    const category = new Category({
        category: req.body.category,
        img: req.file.path
    })
    try {
        const existCategory = Category.find({category: req.body.category})
        if(existCategory[0]){
            return res.status(200).json({msg:'category already exist'})
        }
        await category.save()
        res.status(200).json({msg:'category saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
    let { category } = req.body
    let newCategory = null
    if(req.file) {
        newCategory ={
            category,
            img: req.file.path
        }
    } else {
        newCategory ={
            category
        }
    }
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            $set: newCategory
        }, {new: true})
        res.status(200).json({msg:'Category updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg:'Category deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router