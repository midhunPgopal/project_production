import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
import { useSelector } from 'react-redux'
Chart.register(...registerables)

const OrderBarGraph = () => {
    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const [users, setUsers] = useState()
    const [userValue, setuserValue] = useState()
    const [orders, setOrders] = useState()
    const [orderValue, setOrderValue] = useState()

    const getData = async () => {
        const res = await axios.get('/api/users', { headers: { header } })
        const ress = await axios.get('/api/orders', { headers: { header } })
        setUsers(res.data.dt)
        setOrders(ress.data.dt)
    }
    const getProducts = () => {
        let data = []
        let names = []
        users?.map(item => (
            data.push(item._id),
            names.push(item.name)
        ))
        let count = []
        let length = data.length
        for (let i = 0; i < length; i++) {
            count[i] = 0
            orders?.filter((item) => {
                if (item.userId == data[i]) {
                    count[i]++
                }
            })
        }
        setOrderValue(count)
        setuserValue(names)
    }

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        getProducts()
    }, [users, orders])

    return (
        <div>
            <Bar
                data={{
                    labels: userValue,
                    datasets: [
                        {
                            label: 'Product Sale',
                            data: orderValue,
                            backgroundColor: '#1490e3f0',
                            borderColor: '#74bbebf0',
                            borderWidth: 2,
                        },
                    ]
                }}
                height={20}
                width={40}
            />
        </div>
    )
}

export default OrderBarGraph