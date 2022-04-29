import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled.div`
margin: 30px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
const Wrapper = styled.div`
    padding: 10px;
    ${mobile({ pading: '10px' })}
`
const Title = styled.h1`
text-align: center;
color: #4b1f4cfe;
font-weight: 500;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const Button = styled.button`
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`

const OrdersAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const status = admin.currentAdmin.status
    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const res = await axios.get('/api/orders/', { headers: { header, status } })
        setOrders(res.data)
    }
    const editOrder = (id) => {
        navigate(`/editorder/${id}`)
    }
    const updateButton = (params) => {
        return (
            <Button
                disabled={params.row.status === 'Cancelled'}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    editOrder(params.row.id)
                }}
            >
                <EditIcon />
            </Button>
        )
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', width: 150 },
        { field: 'name', headerName: 'Name', width: 120 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price (₹)', width: 80 },
        { field: 'payment', headerName: 'Payment', width: 160 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'update', headerName: '', renderCell: updateButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = orders ? orders.map((data) => (
        {
            id: data._id,
            createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            updatedAt: dateFormat(data.updatedAt, "mmmm dS, yyyy"),
            name: data.deliveryAddress.name,
            quantity: data.products.length,
            price: data.total,
            payment: data.payment,
            status: data.status,
        })
    ) : null

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Container>
            <Wrapper>
                <Title>Your Orders</Title>
                <Hr />
                <div style={{ height: 400, width: '90%', margin: '50px', padding: '20px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        sx={{
                            '& .MuiDataGrid-cell:hover': {
                                color: 'teal',
                            },
                        }}
                    />
                </div>
                <Hr />
            </Wrapper>
        </Container>
    )
}

export default OrdersAdmin