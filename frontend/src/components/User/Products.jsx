import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"

const Main = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  padding: 1.5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1.5vw; 
`
const Button = styled.button`
  margin: 1.5vw;
  padding: 1vw;
  border: none;
  font-size: 1.2vw;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #26e090fe;
  }
`

const Products = ({ cat, offer, filters, sort, search }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const location = useLocation()
  const value = location.pathname.split('/')[2]

  const getproducts = async () => {
    try {
      if (offer && !cat) {
        const res = await axios.get(`/api/products/offer?offer=${offer}`)
        setProducts(res.data)
      }
      else if (!offer && cat) {
        const res = await axios.get(`/api/products/cat?category=${cat}`)
        setProducts(res.data)
      }
      else {
        const res = await axios.get( value ? `/api/products` : `/api/products/latest`)
        setProducts(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getFilteredProducts = async () => {
    try {
      const res = await axios.get(`/api/products/cat?category=${filters}`)
      setFilteredProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getSearchProducts = async () => {
    try {
      const res = await axios.get(`/api/products/search?search=${search}`)
      setFilteredProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getproducts()
  }, [])
  useEffect(() => {
    getproducts()
  }, [cat, offer])
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  useEffect(() => {
    getFilteredProducts()
  }, [filters])
  useEffect(() => {
    getSearchProducts()
  }, [search])
  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)))
    } else if (sort === 'oldest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt)))
    } else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Main>
      <Container>
        {filteredProducts ? filteredProducts.map(item => (
          <Product item={item} key={item.id} />
        )) : null }
      </Container>
      {!cat && !filters && <ButtonContainer>
        <Link to='/products/all' style={{ textDecoration: 'none' }}>
          <Button>View All Books</Button>
        </Link>
      </ButtonContainer>}
    </Main>
  )
}

export default Products