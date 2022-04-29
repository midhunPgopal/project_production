const router = require('express').Router()
const PreOrder = require('../models/PreOrder')
const verifyStatus = require('../middleware/verifyStatus')

router.get('/:id', verifyStatus, async (req, res) => {
    try {
        const preOrders = await PreOrder.find({UserId: req.params.id})
        res.status(200).json(preOrders)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', async (req, res) => {
    const newPreOrder = new PreOrder(req.body)
    try {
        await newPreOrder.save()
        res.status(200).json({msg:'Pre-order saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        await PreOrder.deleteMany({UserId: req.params.id})
        res.status(200).json({msg:'Pre-order deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router