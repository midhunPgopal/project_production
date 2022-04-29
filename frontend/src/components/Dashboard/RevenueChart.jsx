import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import { useSelector } from 'react-redux'
Chart.register(...registerables)

const RevenueChart = () => {
  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const [orders, setOrders] = useState()
  const [rowValue, setRowValue] = useState()
  const columnValue = ['Total Income', 'Profit' ]

  const getData = async () => {
    const res = await axios.get('/api/orders', { headers: { header } })
    setOrders(res.data)
  }
  const getValues = () => {
    let total = 0
    let profit = 0
    let result = []
    orders?.filter((item) => {
      if (item.status === 'Delivered') {
        total = item.total + total
      }
    })
    profit = (total * 30) / 100
    result.push(total, profit)
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
              label: 'Turnover',
              data: rowValue,
              backgroundColor: ['#834de7f0','#12d5ebf0'],
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

export default RevenueChart