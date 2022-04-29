import React, { useState } from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import AdminProduct from '../../components/ProductManagement/AdminProduct'
import CategoryAdmin from '../../components/CategoryManagement/CategoryAdmin'
import OrdersAdmin from '../../components/OrderManagement/OrdersAdmin'
import UsersAdmin from '../../components/UserManagement/UsersAdmin'
import BannerAdmin from '../../components/BannerManagement/BannerAdmin'
import AnnouncementAdmin from '../../components/AnnouncementManagement/AnnouncementAdmin'
import CouponAdmin from '../../components/CouponManagement/CouponAdmin'
import Dashboard from '../../components/Admin/Dashboard'
import SalesAdmin from '../../components/Admin/SalesAdmin'
import styled from 'styled-components'
import { mobile } from '../../responsive'

const Wrapper = styled.div`
  display: flex;
`
const SideBarDiv = styled.div`
  flex:1;
  height: 100%;
  margin: 20px;
  padding: 20px;
  text-align: left;
`
const Content = styled.div`
  flex: 5;
  height: 100%;
`
const Container = styled.div`
    display: flex;
    background-color: lightgrey;
    flex-direction: column;
    ${mobile({ flexDirection: 'column' })}
`
const List = styled.ul`
    margin: 10px;
    padding: 10px;
    border: 2px solid white;
    list-style: none;
    
`
const ListItem = styled.div`
    width: 100%;
    padding: 10px 0px 10px 0px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      font-weight: bold;
      font-size: 21px;
      color: teal;
    }
`


const AdminHome = () => {

  const [homeFlag, setHomeFlag] = useState(true)
  const [productFlag, setProductFlag] = useState(false)
  const [userFlag, setUserFlag] = useState(false)
  const [orderFlag, setOrderFlag] = useState(false)
  const [categoryFlag, setCategoryFlag] = useState(false)
  const [bannerFlag, setBannerFlag] = useState(false)
  const [announcementFlag, setAnnouncementFlag] = useState(false)
  const [couponFlag, setCouponFlag] = useState(false)
  const [salesFlag, setSalesFlag] = useState(false)

  const getHome = () => {
    setHomeFlag(true)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setAnnouncementFlag(false)
    setCouponFlag(false)
    setSalesFlag(false)
  }
  const getProduct = () => {
    setProductFlag(true)
    setHomeFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setSalesFlag(false)
  }
  const getUser = () => {
    setUserFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setSalesFlag(false)
  }
  const getOrder = () => {
    setOrderFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setCategoryFlag(false)
    setBannerFlag(false)
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setSalesFlag(false)
  }
  const getCategory = () => {
    setCategoryFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setBannerFlag(false)
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setSalesFlag(false)
  }
  const getBanner = () => {
    setBannerFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCategoryFlag(false)
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setSalesFlag(false)
  }
  const getAnnouncement = () => {
    setAnnouncementFlag(true)
    setHomeFlag(false)
    setProductFlag(false)
    setCategoryFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setCouponFlag(false)
    setBannerFlag(false)
    setSalesFlag(false)
  }
  const getCoupon = () => {
    setCouponFlag(true)
    setAnnouncementFlag(false)
    setHomeFlag(false)
    setProductFlag(false)
    setCategoryFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setBannerFlag(false)
    setSalesFlag(false)
  }
  const getSales = () => {
    setCouponFlag(false)
    setAnnouncementFlag(false)
    setHomeFlag(false)
    setProductFlag(false)
    setCategoryFlag(false)
    setUserFlag(false)
    setOrderFlag(false)
    setBannerFlag(false)
    setSalesFlag(true)
  }

  return (
    <>
      <AdminNavbar />
      <Wrapper>
        <SideBarDiv>
          <Container>
            <List>
              <ListItem onClick={getHome}>Dashboard</ListItem>
              <ListItem onClick={getProduct}>Product Management</ListItem>
              <ListItem onClick={getUser}>User Management</ListItem>
              <ListItem onClick={getOrder}>Order Management</ListItem>
              <ListItem onClick={getCategory}>Category Management</ListItem>
              <ListItem onClick={getBanner}>Banner Management</ListItem>
              <ListItem onClick={getAnnouncement}>Announcement Management</ListItem>
              <ListItem onClick={getCoupon}>Coupon Management</ListItem>
              <ListItem onClick={getSales}>Sales Report</ListItem>
            </List>
          </Container>
        </SideBarDiv>
        <Content>
          {homeFlag && <Dashboard />}
          {productFlag && <AdminProduct />}
          {categoryFlag && <CategoryAdmin />}
          {orderFlag && <OrdersAdmin />}
          {userFlag && <UsersAdmin />}
          {bannerFlag && <BannerAdmin />}
          {announcementFlag && <AnnouncementAdmin />}
          {couponFlag && <CouponAdmin />}
          {salesFlag && <SalesAdmin />}
        </Content>
      </Wrapper>
      <AdminFooter />
    </>
  )
}

export default AdminHome