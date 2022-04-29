import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForever'
import { mobile } from '../../responsive'
import { confirm } from 'react-confirm-box'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const AddCategory = styled.div`
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
const ButtonEdit = styled.button`
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`

toast.configure()
const CategoryAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const navigate = useNavigate()

    const [categories, setCategories] = useState()
    const [check, setCheck] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const notifyCategory = () => toast.success('Category added', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCheck = () => {
        setCheck(true)
    }

    const notifyDelete = () => toast.success('Category deleted', {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCategories = async () => {
        const res = await axios.get('/api/categories')
        setCategories(res.data.dt)
    }
    const addCategory = async (data) => {
        const formData = new FormData()
        formData.append('img', data.picture[0])
        formData.append('category', data.category)

        await axios.post('/api/categories/', formData, { headers: { header } })
        notifyCategory()
        getCategories()
        setCheck(false)
    }

    const deleteCat = async (id) => {
        const result = await confirm('Are you sure?')
        if (result) {
            await axios.delete('/api/categories/' + id, { headers: { header } })
            notifyDelete()
            getCategories()
        }
    }
    const editcat = (id) => {
        navigate(`/editcategory/${id}`)
    }
    const editButton = (params) => {
        return (
            <ButtonEdit
                style={{ cursor: 'pointer' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    editcat(params.row.id)
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
                    deleteCat(params.row.id)
                }}
            >
                <DeleteForeverOutlinedIcon />
            </ButtonEdit>
        )
    }
    const columns = [
        { field: 'title', headerName: 'Title', width: 700 },
        { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
        { field: 'delete', headerName: '', renderCell: deleteButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = categories?.map((data) => (
        {
            id: data._id,
            title: data.category
        }
    ))
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Container>
            <Wrapper>
                <TopButton>
                    <Title>Your Categories</Title>
                    <Button onClick={getCheck}>Add Category</Button>
                </TopButton>
                <AddCategory>
                    {check &&
                        <Form onSubmit={handleSubmit(addCategory)}>
                            <InputContainer>
                                <Input id="category" type='text' placeholder='Category' {...register('category', { required: true })} />
                                <Error>
                                    {errors.category && errors.category.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="picture" type='file' {...register('picture', { required: true })} />
                                <Error>
                                    {errors.picture && errors.picture.type === "required" && <span>This is required</span>}
                                </Error>
                            </InputContainer>
                            <ButtonContainer>
                                <ButtonSubmit type='submit' >Add Category</ButtonSubmit>
                                <ButtonClose onClick={() => setCheck(false)}>Close</ButtonClose>
                            </ButtonContainer>
                        </Form>
                    }
                </AddCategory>
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

export default CategoryAdmin