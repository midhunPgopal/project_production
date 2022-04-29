import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import { useSelector } from 'react-redux'
Chart.register(...registerables)

const UserChart = () => {
  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const [users, setUsers] = useState()
  const [rowValue, setRowValue] = useState()
  const columnValue = ['blocked Users', 'Active Users']

  const getData = async () => {
    const res = await axios.get('/api/users', { headers: { header } })
    setUsers(res.data.dt)
  }
  const getValues = () => {
    let block = 0
    let unblock = 0
    let result = []
    users?.filter((item) => {
      if (item.status === true) {
        unblock++
      } else {
        block++
      }
    })
    result.push(block, unblock)
    setRowValue(result)
  }

  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    getValues()
  }, [users])

  return (
    <div>
      <Doughnut
        data={{
          labels: columnValue,
          datasets: [
            {
              label: 'User Status',
              data: rowValue,
              backgroundColor: ['#1490e3f0', '#5ada58f0'],
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

export default UserChart