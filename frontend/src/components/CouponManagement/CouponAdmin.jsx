import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { confirm } from 'react-confirm-box'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import dateFormat from 'dateformat'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

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
const CategoryAdmin = () => {

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const navigate = useNavigate()

    const [coupon, setCoupon] = useState([])
    const [check, setCheck] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const notifyDelete = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getCoupon = async () => {
        const res = await axios.get('/api/coupon')
        setCoupon(res.data)
    }
    const addCoupon = async (data) => {
        const res = await axios.post('/api/coupon/', data, { headers: { header } })
        notify(res.data.msg)
        getCoupon()
        setCheck(false)
    }

    const deleteCoupon = async (id) => {
        const result = await confirm('Are you sure?')
        if (result) {
            const res = await axios.delete('/api/coupon/' + id, { headers: { header } })
            notifyDelete(res.data.msg)
            getCoupon()
        }
    }
    const editCoupon = (id) => {
        navigate(`/editcoupon/${id}`)
    }
    const editButton = (params) => {
        return (
            <ButtonEdit
                style={{ cursor: 'pointer' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    editCoupon(params.row.id)
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
                    deleteCoupon(params.row.id)
                }}
            >
                <DeleteForeverOutlinedIcon />
            </ButtonEdit>
        )
    }
    const columns = [
        { field: 'code', headerName: 'Coupon Code', width: 150 },
        { field: 'discount', headerName: 'Coupon discount', width: 150 },
        { field: 'maximum', headerName: 'Maximum offer', width: 180 },
        { field: 'expiry', headerName: 'Coupon Expiry', width: 150 },
        { field: 'minimum', headerName: 'Minimum amount', width: 160 },
        { field: 'edit', headerName: '', renderCell: editButton, disableClickEventBubbling: true, width: 50 },
        { field: 'delete', headerName: '', renderCell: deleteButton, disableClickEventBubbling: true, width: 50 },
    ]
    const rows = coupon ? coupon.map((data) => (
        {
            id: data._id,
            code: data.couponCode,
            discount: data.discount,
            maximum: data.maximumOfffer,
            expiry: dateFormat(data.expiry, "mmmm dS, yyyy"),
            minimum: data.minimumAmount
        })
    ) : null

    useEffect(() => {
        getCoupon()
    }, [])

    return (
        <Container>
            <Wrapper>
                <TopButton>
                    <Title>Your Coupons</Title>
                    <Button onClick={() => setCheck(true)}>Add Coupon</Button>
                </TopButton>
                <AddCategory>
                    {check &&
                        <Form onSubmit={handleSubmit(addCoupon)}>
                            <InputContainer>
                                <Label>Coupon code
                                    <Input id="couponCode" type='text' placeholder='Coupon code' {...register('couponCode', { required: true })} />
                                    <Error>
                                        {errors.couponCode && errors.couponCode.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                                <Label>Coupon discount
                                    <Input id="discount" type='number' step='0.01' placeholder='Coupon discount' {...register('discount', { required: true })} />
                                    <Error>
                                        {errors.discount && errors.discount.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                                <Label>Coupon maximum
                                    <Input id="maximumOfffer" type='number' placeholder='Coupon maximum discount' {...register('maximumOfffer', { required: true })} />
                                    <Error>
                                        {errors.maximumOfffer && errors.maximumOfffer.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                                <Label>Coupon expiry
                                    <Input id="expiry" type='date' placeholder='Coupon expiry date' {...register('expiry', { required: true })} />
                                    <Error>
                                        {errors.expiry && errors.expiry.type === "required" && <span>This is required</span>}
                                    </Error>
                                </Label>
                            </InputContainer>
                            <ButtonContainer>
                                <ButtonSubmit type='submit' >Add Coupon</ButtonSubmit>
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
                                color: 'primary.main',
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