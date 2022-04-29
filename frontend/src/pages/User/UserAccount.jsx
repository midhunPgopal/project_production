import React from 'react'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import UserDetails from '../../components/User/UserDetails'

function UserAccount() {
    return (
        <>
            <Announcement />
            <Navbar />
            <UserDetails/>
            <Newsletter />
            <Footer />
        </>
    )
}

export default UserAccount