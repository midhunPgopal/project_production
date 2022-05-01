import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import dateFormat from 'dateformat'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'
import { logOut } from '../../redux/userRedux'
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const Container = styled.div``
const Wrapper = styled.div`
    padding: 1.2vw;
    disaply: flex;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    font-size: 3vw;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 0.1vw;
    margin: 1vw 1vw;
`
const Button = styled.button`
   padding: 0.5vw;
   cursor: pointer;
   border: none;
   background-color: transperant;

   &:hover {
    background-color: lightgrey;
   }
   &:disabled {
       cursor: not-allowed;
   }
`
toast.configure()
const Orders = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const [orders, setOrders] = useState()

    const notify = (msg) => {
        toast.success(msg, {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const getOrders = async () => {
        try {
            const res = await axios.get('/api/orders/findusercart/' + userId, { headers: { header, userId } })
            setOrders(res.data.dt)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const cancelOrder = async (id) => {
        try {
            let result
            result = await confirm('Do you want to cancel ?')
            if (result) {
                const res = await axios.put('/api/orders/cancel/' + id, { headers: { header, userId } })
                notify(res.data.msg)
                getOrders()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const cancelButton = (params) => {
        return (
            <Button
                disabled={params.row.status === 'Cancelled' || params.row.status === 'Shipped' || params.row.status === 'Delivered'}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    cancelOrder(params.row.id)
                }}
            >
                <DeleteForeverOutlinedIcon />
            </Button>
        )
    }
    const columns = [
        { field: 'date', headerName: 'Date', width: 250 },
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'payment', headerName: 'Payment', width: 250 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'cancel', headerName: '', width: 100, renderCell: cancelButton, disableClickEventBubbling: true, },
    ]
    const rows = orders?.map((data) => (
        {
            id: data._id,
            date: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            name: data.deliveryAddress.name,
            quantity: data.products.length,
            price: data.total,
            payment: data.payment,
            status: data.status
        })
    )
    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your Orders</Title>
                <Hr />
                <div style={{flexGrow: 1}}>
                    <div style={{ height: '30vw', width: '90vw', margin: '3vw', padding: '1vw' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            sx={{
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main'
                                }
                            }}
                        />
                    </div>
                </div>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Orders