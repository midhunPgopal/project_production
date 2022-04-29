const router = require('express').Router()
const Wishlist = require('../models/Wishlist')
const verifyStatus = require('../middleware/verifyStatus')

//Creating

router.post('/',  verifyStatus, async (req, res) => {
    const existingList = await Wishlist.findOne({ productId: req.body.productId })
    if (existingList) {
        return res.status(200).json({ msg: 'Product already added' })
    } 
    const newWishlist = new Wishlist(req.body)
    try {
        await newWishlist.save()
        res.status(200).json({ msg: 'Added to wishlist' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//Delete Wishlist

router.delete('/:id',  verifyStatus, async (req, res) => {
    try {
        await Wishlist.deleteMany({ userId: req.params.id })
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one wishlist entry

router.delete('/find/:id',  verifyStatus, async (req, res) => {
    try {
        await Wishlist.deleteOne({ productId: req.params.id })
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get wishlist

router.get('/:id',  verifyStatus, async (req, res) => {
    try {
        const product = await Wishlist.find({ userId: req.params.id })
        res.status(200).json({dt: product})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router