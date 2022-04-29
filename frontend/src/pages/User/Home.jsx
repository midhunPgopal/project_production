import React from 'react'
import Announcement from '../../components/User/Announcement'
import Categories from '../../components/User/Categories'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import Products from '../../components/User/Products'
import Banner from '../../components/User/Banner'

const Home = () => {
  return (
    <>
        <Announcement/>
        <Navbar/>
        <Banner/>
        <Categories/>
        <Products/>
        <Newsletter/>
        <Footer/>
    </>
  )
}

export default Home