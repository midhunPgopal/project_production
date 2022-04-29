const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.header
    if(authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                res.status(403).json('Token invalid')
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json('You are not authenticated')
    }
}

const verifyTokenAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You are not allowed')
        }
    })
}

module.exports = {verifyToken, verifyTokenAuth, verifyTokenAndAdmin}