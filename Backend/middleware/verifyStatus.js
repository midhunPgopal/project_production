const User = require('../models/User')

const verifyStatus = async (req, res, next) => {
    const id = req.headers.userid
    if (id) {
        const user = await User.findById(id)
        if (user && user.status) {
            next()
        } else {
            return res.status(500).json({ status: 'User is blocked' })
        }
    } else {
        next()
    }
}

module.exports = verifyStatus