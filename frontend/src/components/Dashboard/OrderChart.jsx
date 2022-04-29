import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import { useSelector } from 'react-redux'
Chart.register(...registerables)

const OrderChart = () => {
  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const [orders, setOrders] = useState()
  const [rowValue, setRowValue] = useState()
  const columnValue = ['Pending', 'Order placed', 'Shipped', 'Delivered', 'Cancelled' ]

  const getData = async () => {
    const res = await axios.get('/api/orders', { headers: { header } })
    setOrders(res.data)
  }
  const getValues = () => {
    let pending = 0
    let placed = 0
    let shipped = 0
    let delivered = 0
    let cancelled = 0
    let result = []
    orders?.filter((item) => {
      if (item.status === 'Pending') {
        pending++
      } else if (item.status === 'Order placed') {
        placed++
      } else if (item.status === 'Shipped') {
        shipped++
      }else if (item.status === 'Delivered') {
        delivered++
      } else {
          cancelled++
      }
    })
    result.push(pending, placed, shipped, delivered, cancelled)
    setRowValue(result)
  }

  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    getValues()
  }, [orders])

  return (
    <div>
      <Doughnut
        data={{
          labels: columnValue,
          datasets: [
            {
              label: 'Order Status',
              data: rowValue,
              backgroundColor: ['#8fe0a6f0','#d5f924f0', '#e34abff0', '#07a734f0','#f60505f0'],
              borderColor: '#f3f6f3f0',
              borderWidth: 2,
              radius: 150
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default OrderChart