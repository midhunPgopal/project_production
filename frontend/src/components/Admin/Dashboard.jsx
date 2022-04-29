import React, { useState } from 'react'
import UserChart from '../Dashboard/UserChart'
import OrderChart from '../Dashboard/OrderChart'
import RevenueChart from '../Dashboard/RevenueChart'
import OrderBarGraph from '../Dashboard/OrderBarGraph'
import styled from 'styled-components'
import { mobile } from '../../responsive'

const Container = styled.div`
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`
const Body = styled.div`
    padding: 10px;
    ${mobile({ pading: '10px' })}
`
const Button = styled.button`
  width: 15%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 50px;

  &:hover {
    background-color: #26e090fe;
`
const TopButton = styled.div`
    flex: 1;
    display: flex;
    aling-items: center;
    justify-content: space-around;
`
const Charts = styled.div`
  height: 500px;
  width: 100%;
  display: felx;
  flex-direction: row;
  justify-content: space-between;
`

function Dashboard() {

  const [flag, setFlag] = useState(true)

  return (
    <Container>
      <Body>
        <TopButton>
          <Button onClick={() => setFlag(true)}>General</Button>
          <Button onClick={() => setFlag(false)}>Product sale</Button>
        </TopButton>
        {flag ?
          <Charts >
            <UserChart />
            <OrderChart />
            <RevenueChart />
          </Charts> :
          <OrderBarGraph />
        }
      </Body>
    </Container>
  )
}

export default Dashboard