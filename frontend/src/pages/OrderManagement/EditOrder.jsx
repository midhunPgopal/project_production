import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminFooter from '../../components/Admin/AdminFooter'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import EditOrderForm from '../../components/OrderManagement/EditOrderForm'

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

const EditOrder = () => {

  const location = useLocation()
  const id = location.pathname.split('/')[2]
  
  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const [order, setOrder] = useState()

  const getOrder = async () => {
    const res = await axios.get('/api/orders/find/' + id, {headers: {header}})
    const [values] = res.data.dt
    let {deliveryAddress, status} = values
    let { name, mobile, email, pincode, address} = deliveryAddress
    const data = {name, mobile, email, pincode, address, status}
    setOrder(data)
}

useEffect(() => {
    getOrder()
  }, [id])

  return (
    <> 
      <AdminNavbar />
      <Container>
        <Title>Update Order</Title>
        <FormContainer>
          {order ? <EditOrderForm preloadedData={order} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditOrder