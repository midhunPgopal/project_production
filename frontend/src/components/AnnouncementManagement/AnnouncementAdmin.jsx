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
import dateFormat from 'dateformat'
import { DataGrid } from '@mui/x-data-grid';

const Container = styled.div`
  margin: 30px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  `
const TopButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`
const Button = styled.button`
  width: 15%;
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
const Title = styled.h1`
margin: 10px;
text-align: center;
color: #4b1f4cfe;
font-weight: 500;
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
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
const ButtonEdit = styled.button`
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`
toast.configure()
const AnnouncementAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [announcement, setAnnouncement] = useState()
    const [flag, setFlag] = useState(false)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getAnnouncement = async () => {
        const res = await axios.get('/api/announcement/')
        setAnnouncement(res.data.dt)
    }
    const getFlag = () => {
        setFlag(true)
    }
    const addAnnouncement = async (data) => {
        const res = await axios.post('/api/announcement/', data, { headers: { header } })
        notify(res.data.msg)
        getAnnouncement()
        setFlag(false)
    }
    const deleteAnnouncement = async (id) => {
        const result = await confirm("Are you sure?")
        if (result) {
            const res = await axios.delete('/api/products/' + id, { headers: { header } })
            getAnnouncement()
            notify(res.data.msg)
        }
    }
    const editAnnouncement = (id) => {
        navigate(`/editannouncement/${id}`)
    }
    const editButton = (params) => {
        return (
            <ButtonEdit
                style={{ cursor: 'pointer' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    editAnnouncement(params.row.id)
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
                    deleteAnnouncement(params.row.id)
                }}
            >
                <DeleteForeverOutlinedIcon />
            </ButtonEdit>
        )
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', width: 200 },
        { field: 'updatedAt', headerName: 'Updated At', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
        { field: 'delete', headerName: '', renderCell: deleteButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = announcement?.map((data) => (
        {
            id: data._id,
            createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            updatedAt: dateFormat(data.updatedAt, "mmmm dS, yyyy"),
            description: data.announcement,
        }
    ))
    useEffect(() => {
        getAnnouncement()
    }, [])

    return (
        <Container>
            <TopButton>
                <Title>Your Announcements</Title>
                <Button onClick={getFlag}>Add Announcement</Button>
            </TopButton>
            <AddProduct>
                {flag &&
                    <Form onSubmit={handleSubmit(addAnnouncement)}>
                        <InputContainer>
                            <Label>Announcement
                                <Input id="announcement" type='text' placeholder='Announcement' {...register('announcement', { required: true })} />
                                <Error>
                                    {errors.announcement && errors.announcement.type === "required" && <span>This is required</span>}
                                </Error>
                            </Label>
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
        </Container>
    )
}

export default AnnouncementAdmin