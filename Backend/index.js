const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
var util= require('util')
var encoder = new util.TextEncoder('utf-8')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productsRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const ordersRoute = require('./routes/order')
const newsletterRoute = require('./routes/newsletter')
const adminAuthRoute = require('./routes/adminAuth')
const categoryRoute = require('./routes/category')
const preOrderRoute = require('./routes/preOrder')
const wishlistRoute = require('./routes/wishlist')
const bannerRoute = require('./routes/banner')
const announcementRoute = require('./routes/announcement')
const reviewRoute = require('./routes/reviews')
const addressRoute = require('./routes/address')
const userDetailsRoute = require('./routes/userDetails')
const couponRoute = require('./routes/coupon')
const referalRoute = require('./routes/referalCode')

const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(cors({ Credential: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productsRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/newsletter', newsletterRoute)
app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/preorder', preOrderRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/banner', bannerRoute)
app.use('/api/announcement', announcementRoute)
app.use('/api/review', reviewRoute)
app.use('/api/address', addressRoute)
app.use('/api/userdetails', userDetailsRoute)
app.use('/api/coupon', couponRoute)
app.use('/api/referal', referalRoute)

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
