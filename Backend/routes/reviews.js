const router = require('express').Router()
const { verifyTokenAndAdmin} = require('../middleware/verifyToken')
const Review = require('../models/Reviews')
const verifyStatus = require('../middleware/verifyStatus')

router.get('/:id', async (req, res) => {
    try {
        const review = await Review.find({productId: req.params.id})
        res.status(200).json({dt: review})
    } catch (error) {
        console.log(error);
    }
})

router.post('/',  verifyStatus, async (req, res) => {
    const newReview = new Review(req.body)
    try {
        await newReview.save()
        res.status(200).json({msg: 'Review created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Review deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router