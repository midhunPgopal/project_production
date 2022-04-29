import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

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
const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
  `
const Text = styled.span`
  margin: 0px 50px 0px 0px;
`
const Error = styled.span`
  font-size: 14px;
  padding: 5px;
  color: #f16969;
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
`
const Input = styled.input`
  width: 200px;
  margin: 10px;
  padding: 10px;
  ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  width: 250px;
`
const ButtonSubmit = styled.button`
  width: 30%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
toast.configure()

const SalesAdmin = () => {

  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const [orders, setOrders] = useState()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const notify = (msg) => {
    toast.error(msg, {
      position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    });
  }

  const getOrders = async () => {
    try {
      let value = []
      const res = await axios.get('/api/orders', { headers: { header } })
      res.data?.filter(item => {
        if (item.status === 'Delivered') {
          value.push(item)
        }
      })
      setOrders(value)
    } catch (error) {
      console.log(error)
    }
  }
  const filterData = async (data) => {
    try {
      let value = []
      const ress = await axios.post('/api/orders/sales', data, { headers: { header } })
      ress.data?.filter(item => {
        if (item.status === 'Delivered') {
          value.push(item)
        }
      })
      setOrders(value)
    } catch (error) {
      console.log(error)
      error.response.data.msg && notify(error.response.data.msg)
    }
  }
  const columns = [
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price (₹)', width: 100 },
    { field: 'payment', headerName: 'Payment', width: 160 },
    { field: 'status', headerName: 'Status', width: 100 }
  ]
  const rows = orders ? orders.map((data) => (
    {
      id: data._id,
      createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sales Report</Title>
        <Hr />
        <TopBar>
          <Form onSubmit={handleSubmit(filterData)}>
            <Text>Filter by Date</Text>
            <InputContainer>
              <Input id="start" type='date' {...register('start', { required: true })} />
              <Error>
                {errors.start && errors.start.type === "required" && <span>This is required</span>}
              </Error>
              <Input id="end" type='date' {...register('end', { required: true })} />
              <Error>
                {errors.end && errors.end.type === "required" && <span>This is required</span>}
              </Error>
            </InputContainer>
            <ButtonContainer>
              <ButtonSubmit type='submit' >Filter</ButtonSubmit>
            </ButtonContainer>
          </Form>
        </TopBar>
        <div style={{ height: 450, width: '80%', margin: '50px', padding: '20px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'teal',
              }
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
        <Hr />
      </Wrapper>
    </Container>
  )
}

export default SalesAdmin