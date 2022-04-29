import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import dateFormat from 'dateformat'
import { useNavigate } from 'react-router-dom'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'
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
font-weight: 500;;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 1px;
    margin: 10px 10px;
    ${mobile({ margin: '30px' })}
`
const ButtonBlock = styled.button`
    padding: 5px;
    border: none;
    background-color: rgb(249, 121, 121);
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: rgb(246, 0, 0);
    }
`
const ButtonUnblock = styled.button`
    padding: 5px;
    border: none;
    background-color: #6f85e678;
    color: white;
    text-align: center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 2px 4px lightgrey;

    &:hover {
        background-color: #0b34eb78;
    }
`
const ButtonEdit = styled.button`
    border: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`
toast.configure()
const UsersAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [flag, setFlag] = useState(null)

    const notifyBlocked = () => {
        toast.warning('User blocked', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }
    const notifyUnblocked = () => {
        toast.info('User unblocked', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const getUsers = async () => {
        const res = await axios.get('/api/users', { headers: { header } })
        setUsers(res.data)
    }
    const block = async (id) => {
        const result = await confirm('Do you want to block this user?')
        if (result) {
            await axios.put('/api/users/status/' + id, { status: false }, { headers: { header } })
            notifyBlocked()
            getUsers()
            setFlag(true)
        }
    }
    const unblock = async (id) => {
        const result = await confirm('Do you want to unblock this user?')
        if (result) {
            await axios.put('/api/users/status/' + id, { status: true }, { headers: { header } })
            notifyUnblocked()
            getUsers()
            setFlag(false)
        }
    }
    const edituser = (id) => {
        navigate(`/edituser/${id}`)
    }
    const editButton = (params) => {
        return (
            <ButtonEdit
                style={{ cursor: 'pointer' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    edituser(params.row.id)
                }}
            >
                <EditIcon />
            </ButtonEdit>
        )
    }
    const blockButton = (params) => {
        if (params.row.status) {
            return (
                <ButtonBlock
                    style={{ cursor: 'pointer' }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        block(params.row.id)
                    }}
                >
                    Block
                </ButtonBlock >
            )
        } else {
            return (
                <ButtonUnblock
                    style={{ cursor: 'pointer' }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        unblock(params.row.id)
                    }}
                >
                    Unblock
                </ButtonUnblock >
            )
        }
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', width: 180 },
        { field: 'updatedAt', headerName: 'Updated At', width: 180 },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'email', headerName: 'Email ID', width: 230 },
        { field: 'admin', headerName: 'Admin', width: 80 },
        { field: 'block', headerName: '', renderCell: blockButton, disableClickEventBubbling: true, width: 80 },
        { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = users ? users.map((data) => (
        {
            id: data._id,
            createdAt: dateFormat(data.createdAt, "mmmm dS, yyyy"),
            updatedAt: dateFormat(data.updatedAt, "mmmm dS, yyyy"),
            name: data.name,
            email: data.email,
            admin: data.isAdmin,
            status: data.status
        })
    ) : null
    useEffect(() => {
        getUsers()
    }, [flag])

    return (
        <Container>
            <Wrapper>
                <Title>All users</Title>
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

export default UsersAdmin