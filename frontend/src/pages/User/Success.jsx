import React from 'react'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import OrderSuccess from '../../components/User/OrderSuccess'

const Success = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <OrderSuccess />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Success