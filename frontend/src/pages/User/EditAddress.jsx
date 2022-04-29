import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditAddressForm from '../../components/AddressManagement/EditAddressForm'
import NavBar from '../../components/User/Navbar'
import Footer from '../../components/User/Footer'
import styled from 'styled-components'

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
    url('https://mcdn.wallpapersafari.com/medium/96/49/1qkOeG.jpg') center;
  background-size: cover;
`
const Title = styled.h1`
  margin: 1.5vw 0vw 0vw 1.5vw;
  font-size: 3vw;
  text-align: left;
  font-weight: 600;
  color: #30163efe;
`
const FormContainer = styled.div`
  margin: 1vw;
  padding: 1vw;
`

const EditAddress = () => {

  const location = useLocation()

  const [address, setAddress] = useState()
  
  const id = location.pathname.split('/')[2] 

  const getAddress = async () => {
    const res = await axios.get('/api/address/find/' + id,)
    console.log(res.data);
    setAddress(res.data)
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <> 
      <NavBar />
      <Container>
        <Title>Update Address</Title>
        <FormContainer>
          {address ? <EditAddressForm preloadedData={address} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <Footer />
    </>
  )
}

export default EditAddress