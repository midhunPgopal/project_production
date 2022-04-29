import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { logOut } from '../../redux/userRedux'

const Container = styled.div`
    height: 40vw;
    width: 100vw;
    background-color: #89eaa4fe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 5vw;
    margin-bottom: 1.2vw;
    color: white;
`
const ImageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1px solid white;
  width: 10vw;
  padding: 1vw;
  margin: 1vw;
  transition: all 0.1s ease;
  &:hover {
    transform: scale(1.1);
    background-color: white;
  }
`
const Image = styled.img`
  height: 10vw;
  width: 6vw;
  object-fit: cover;
`
const PaymentForm = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  let userId = null
  if (user) {
    userId = user.user._id
  }
  const [detail, setDetails] = useState()

  const getOrders = async () => {
    try {
      const res = await axios.get('/api/orders/findusercart/' + userId, { headers: { userId } })
      const data = res.data.dt
      setDetails(data[0].products)
    } catch (error) {
      console.log(error)
      error.response.data.status && dispatch(logOut())
    }
  }
  useEffect(() => {
    getOrders()
  }, [])


  return (
    <Container>
      <Title>Order Successfull..!!</Title>
      <ImageContainer>
        {detail?.map(item => (
          <Card>
            <Image src={item.product.img}></Image>
          </Card>
        ))}
      </ImageContainer>
    </Container>
  )
}

export default PaymentForm