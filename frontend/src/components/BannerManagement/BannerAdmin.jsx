import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirm } from 'react-confirm-box'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
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
const BannerAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [banner, setBanner] = useState([])
    const [flag, setFlag] = useState(false)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getBanner = async () => {
        const res = await axios.get('/api/banner/')
        setBanner(res.data)
    }
    const getFlag = () => {
        setFlag(true)
    }
    const addBanner = async (data) => {
        const formData = new FormData()
        formData.append('img', data.picture[0])
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('offerDescription', data.offerDescription)
        formData.append('offerCode', data.offerCode)
        formData.append('discount', data.discount)
        formData.append('bg', data.bg)

        const res = await axios.post('/api/banner/', formData, { headers: { header } })
        notify(res.data.msg)
        getBanner()
        setFlag(false)
    }
    const deleteBanner = async (id) => {
        const result = await confirm("Are you sure?")
        if (result) {
            const res = await axios.delete('/api/products/' + id, { headers: { header } })
            getBanner()
            notify(res.data.msg)
        }
    }
    const editBanner = (id) => {
        navigate(`/editbanner/${id}`)
    }
    const editButton = (params) => {
        return (
            <ButtonEdit
                style={{ cursor: 'pointer' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    editBanner(params.row.id)
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
                    deleteBanner(params.row.id)
                }}
            >
                <DeleteForeverOutlinedIcon />
            </ButtonEdit>
        )
    }
    const columns = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 320 },
        { field: 'offer', headerName: 'Offer Description', width: 350 },
        { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
        { field: 'delete', headerName: '', renderCell: deleteButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = banner ? banner.map((data) => (
        {
            id: data._id,
            title: data.title,
            description: data.description,
            offer: data.offerDescription
        }
    )) : null
    useEffect(() => {
        getBanner()
    }, [])

    return (
        <Container>
            <Wrapper>
                <TopButton>
                    <Title>Your Banner</Title>
                    <Button onClick={getFlag}>Add Banner</Button>
                </TopButton>
                <AddProduct>
                    {flag &&
                        <Form onSubmit={handleSubmit(addBanner)}>
                            <InputContainer>
                                <Input id="title" type='text' placeholder='Title' {...register('title', { required: true })} />
                                <Error>
                                    {errors.title && errors.title.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="description" type='text' placeholder='About the book' {...register('description', { required: true })} />
                                <Error>
                                    {errors.description && errors.description.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="offerDescription" type='text' placeholder='Offer description' {...register('offerDescription', { required: true })} />
                                <Error>
                                    {errors.offerDescription && errors.offerDescription.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="offerCode" type='text' placeholder='Offer code' {...register('offerCode', { required: true })} />
                                <Error>
                                    {errors.offerCode && errors.offerCode.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="discount" type='number' step='0.01' placeholder='discount percentage' {...register('discount', { required: true })} />
                                <Error>
                                    {errors.discount && errors.discount.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="picture" type='file' {...register('picture', { required: true })} />
                                <Error>
                                    {errors.picture && errors.picture.type === "required" && <span>This is required</span>}
                                </Error>
                                <Input id="bg" type='text' placeholder='background colour' {...register('bg', { required: true })} />
                                <Error>
                                    {errors.bg && errors.bg.type === "required" && <span>This is required</span>}
                                </Error>
                            </InputContainer>
                            <ButtonContainer>
                                <ButtonSubmit type='submit' >Add Banner</ButtonSubmit>
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

export default BannerAdmin