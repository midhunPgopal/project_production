import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { mobile } from '../../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box"
import dateFormat from 'dateformat'
import { DataGrid } from '@mui/x-data-grid';

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
  }
  `
const TopButton = styled.div`
    flex: 1;
    display: flex;
    aling-items: center;
    justify-content: space-around;
  `
const AddProduct = styled.div`
  margin: 0px;
`
const InputContainer = styled.div`
  flex: 1;
`
const ButtonContainer = styled.div`
flex: 1;
margin: 20px;
display: flex;
justify-content: flex-start;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 20px;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Input = styled.input`
  width: 300px;
  margin: 10px;
  padding: 10px;
  ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Error = styled.span`
  font-size: 14px;
  padding: 5px;
  color: #f16969;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const ButtonEdit = styled.button`
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`
toast.configure()
const AdminProduct = () => {

  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [product, setProduct] = useState([])
  const [flag, setFlag] = useState(false)

  const notify = (msg) => toast.success(msg, {
    position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
  })

  const getProducts = async () => {
    const res = await axios.get('/api/products/')
    setProduct(res.data)
  }
  const addProduct = async (data) => {
    const formData = new FormData()
    formData.append('img', data.picture[0])
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('author', data.author)
    formData.append('publisher', data.publisher)
    formData.append('publishedAt', data.publishedAt)
    formData.append('category', data.category)
    formData.append('chapter', data.chapter)
    formData.append('price', data.price)
    formData.append('offer', data.offer)

    const res = await axios.post('/api/products/', formData, { headers: { header, 'content-type': 'multipart/form-data' } })
    getProducts()
    notify(res.data.msg)
    setFlag(false)
  }
  const viewProduct = (id) => {
    navigate(`/viewproduct/${id}`)
  }
  const editProduct = (id) => {
    navigate(`/editproduct/${id}`)
  }
  const deleteProduct = async (id) => {
    const result = await confirm("Are you sure?")
    if (result) {
      const res = await axios.delete('/api/products/' + id, { headers: { header } })
      getProducts()
      notify(res.data.msg)
    }
  }
  const viewButton = (params) => {
    return (
      <ButtonEdit
        style={{ cursor: 'pointer' }}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          viewProduct(params.row.id)
        }}
      >
        <RemoveRedEyeOutlinedIcon />
      </ButtonEdit>
    )
  }
  const editButton = (params) => {
    return (
      <ButtonEdit
        style={{ cursor: 'pointer' }}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          editProduct(params.row.id)
        }}
      >
        <EditIcon />
      </ButtonEdit>
    )
  }
  const deleteButton = (params) => {
    return (
      <ButtonEdit
        style={{ cursor: 'pointer' }}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          deleteProduct(params.row.id)
        }}
      >
        <DeleteForeverOutlinedIcon />
      </ButtonEdit>
    )
  }
  const columns = [
    { field: 'createdAt', headerName: 'Created At', width: 170 },
    { field: 'updatedAt', headerName: 'Updated At', width: 170 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'price', headerName: 'Price', width: 80 },
    { field: 'view', headerName: '', renderCell: viewButton, disableClickEventBubbling: true, width: 50 },
    { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
    { field: 'delete', headerName: '', renderCell: deleteButton, disableClickEventBubbling: true, width: 50 },
  ]
  const rows = product ? product.map((data) => (
    {
      id: data._id,
      createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
      updatedAt: dateFormat(data.updatedAt, "mmmm dS, yyyy"),
      title: data.title,
      author: data.author,
      price: data.price
    })
  ) : null

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Container>
      <Wrapper>
        <TopButton>
          <Title>Your Products</Title>
          <Button onClick={() => setFlag(true)}>Add Product</Button>
        </TopButton>
        <AddProduct>
          {flag &&
            <Form onSubmit={handleSubmit(addProduct)}>
              <InputContainer>
                <Input id="title" type='text' placeholder='Title' {...register('title', { required: true })} />
                <Error>
                  {errors.title && errors.title.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="description" type='text' placeholder='About the book' {...register('description', { required: true })} />
                <Error>
                  {errors.description && errors.description.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="author" type='text' placeholder='Author' {...register('author', { required: true })} />
                <Error>
                  {errors.author && errors.author.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="publisher" type='text' placeholder='Publisher' {...register('publisher', { required: true })} />
                <Error>
                  {errors.publisher && errors.publisher.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="publishedAt" type='date' placeholder='Published on' {...register('publishedAt', { required: true })} />
                <Error>
                  {errors.publishedAt && errors.publishedAt.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="picture" type='file' {...register('picture', { required: true })} />
                <Error>
                  {errors.picture && errors.picture.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="category" type='text' placeholder='Separate the categories by a coma' {...register('category', { required: true })} />
                <Error>
                  {errors.category && errors.category.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="chapter" type='text' placeholder='Separate the chapters by a coma' {...register('chapter', { required: true })} />
                <Error>
                  {errors.chapter && errors.chapter.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="price" type='number' placeholder='Selling Price' {...register('price', { required: true })} />
                <Error>
                  {errors.price && errors.price.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="offer" type='text' placeholder='Offers' {...register('offer', { required: false })} />
              </InputContainer>
              <ButtonContainer>
                <ButtonSubmit type='submit' >Add Book</ButtonSubmit>
                <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
              </ButtonContainer>
            </Form>
          }
        </AddProduct>
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
    </Container >
  )
}

export default AdminProduct