const router = require('express').Router()
const ReferralCode = require('../models/ReferralCode')

router.get('/:id', async (req, res) => {
    try {
        const referal = await ReferralCode.findOne({referalCode: req.params.id})
        res.status(200).json({dt: referal})
    } catch (error) {
        console.log(error);
    }
})
router.get('/find/:id', async (req, res) => {
    try {
        const referal = await ReferralCode.findOne({username: req.params.id})
        console.log(referal);
        res.status(200).json({dt: referal})
    } catch (error) {
        console.log(error);
    }
})




module.exports = router