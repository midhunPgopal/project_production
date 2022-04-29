import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditCouponForm from '../../components/CouponManagement/EditCouponForm'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import styled from 'styled-components'

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
    url('https://mcdn.wallpapersafari.com/medium/96/49/1qkOeG.jpg') center;
  background-size: cover;
`
const Title = styled.h1`
  margin: 50px 0px 0px 50px;
  text-align: left;
  font-weight: 600;
  color: #30163efe;
`
const FormContainer = styled.div`
  margin: 10px;
  padding: 10px;
`

const EditCoupon = () => {

  const location = useLocation()

  const [coupon, setCoupon] = useState()
  
  const id = location.pathname.split('/')[2] 

  const getCoupon = async () => {
    const res = await axios.get('/api/coupon/find/' + id)
    let { _id, couponCode, discount, maximumOfffer, users, expiry, minimumAmount} = res.data.dt
    expiry = expiry.slice(0,10)
    setCoupon({_id, couponCode, discount, maximumOfffer, users, expiry, minimumAmount})
  }

  useEffect(() => {
    getCoupon()
  }, [])

  return (
    <> 
      <AdminNavbar />
      <Container>
        <Title>Update Coupon</Title>
        <FormContainer>
          {coupon ? <EditCouponForm preloadedData={coupon} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditCoupon