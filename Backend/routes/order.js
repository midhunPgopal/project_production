const router = require('express').Router()
const { verifyTokenAndAdmin} = require('../middleware/verifyToken')
const Order = require('../models/Order')
const verifyStatus = require('../middleware/verifyStatus')
const Razorpay = require('razorpay')
const shortid = require('shortid')

//Creating

router.post('/',  verifyStatus, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        await newOrder.save()
        res.status(200).json({msg: 'Order created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update order

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, {
            $set:{ 'deliveryAddress': req.body.deliveryAddress , 'status' : req.body.status }
        }) 
        res.status(200).json({msg: 'Order updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//cancel order

router.put('/cancel/:id', verifyStatus, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, {
            $set: {'status':'Cancelled'}
        })
        res.status(200).json({msg: 'Order cancelled'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get single order for Admin

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find({_id: req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})
//Get single order for User

router.get('/findusercart/:id',  verifyStatus, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.id}).sort({createdAt: -1})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Sales report 

router.post('/sales', verifyTokenAndAdmin, async (req, res) => {
    try {
        let start = new Date(req.body.start)
        let end = new Date(req.body.end)
        let result = []
        const orders = await Order.find()
        orders.filter(item => {
            if(item.createdAt <= end && item.createdAt >= start) {
                result.push(item)
            }
        })
        if(!result[0]) {
            return res.status(500).json({msg: 'No data found'})
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

//razorpay

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

router.post('/razorpay', verifyStatus, async (req, res) => {
    const payment_capture = 1
    const currency = 'INR'

    const options = {
        amount: req.body.total * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router