import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditProductForm from '../../components/ProductManagement/EditProductForm'
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

const EditProduct = () => {

  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [product, setProduct] = useState()

  const getProduct = async () => {
    const res = await axios.get('/api/products/find/' + id)
    let { author, categories, chapters, description, img, offers, price, publishedAt, publisher, title } = res.data.dt
    const category = categories?.toString()
    const chapter = chapters?.toString()
    const offer = offers?.toString()
    publishedAt = publishedAt.slice(0,10)
    const data = { author, category, chapter, description, img, offer, price, publishedAt, publisher, title }
    setProduct(data)
  }

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <>
      <AdminNavbar />
      <Container>
        <Title>Update Form</Title>
        <FormContainer>
          {product ? <EditProductForm preloadedData={product} /> : <h1 style={{ textAlign: 'center' }}>Loading..</h1>}
        </FormContainer>
      </Container>
      <AdminFooter />
    </>
  )
}

export default EditProduct