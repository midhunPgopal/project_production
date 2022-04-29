import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Form = styled.form`
    margin-left: 50px;
`
const Input = styled.input`
    width: 300px;
    margin: 10px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Select = styled.select`
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
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonContainer = styled.div`
    margin: 20px;
`
const ButtonSubmit = styled.button`
  width: 10%;
  padding: 10px;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
const EditOrderForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = () => {
        toast('Order updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }
    const updateOrder = async (data) => {
        let { name, mobile, email, pincode, address, status } = data
        const deliveryAddress = { name, mobile, email, pincode, address }
        const payload = { deliveryAddress, status }
        await axios.put('/api/orders/' + id, payload, { headers: { header } })
        notify()
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateOrder)}>
            <InputContainer>
                <Label>Name
                    <Input id="name" type='text' placeholder='Name' {...register('name', { required: true, maxLength: 15, minLength: 3 })} />
                    <Error>
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Min length of 3 required</span>}
                    </Error>
                </Label>
                <Label>Email
                    <Input id="email" placeholder='Email' {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })} />
                    <Error>
                        {errors.email && errors.email.type === "required" && <span>This is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                    </Error>
                </Label>
                <Label>Mobile
                    <Input id="mobile" type='number' placeholder='Mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                    <Error>
                        {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                        {errors.mobile && errors.mobile.type === "maxLength" && <span>Mobile number should be 10 digits</span>}
                        {errors.mobile && errors.mobile.type === "minLength" && <span>Mobile number should be 10 digits</span>}
                    </Error>
                </Label>
                <Label>Shipping Address
                    <Input id="address" type='text' placeholder='Full address' {...register('address', { required: true })} />
                    <Error>
                        {errors.address && errors.address.type === "required" && <span>This is required</span>}
                    </Error>
                </Label>
                <Label>Shipping Pincode
                    <Input id="pincode" type='number' placeholder='Pincode' {...register('pincode', { required: true, maxLength: 6, minLength: 6 })} />
                    <Error>
                        {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                        {errors.pincode && errors.pincode.type === "maxLength" && <span>Pincode should be 6 digits</span>}
                        {errors.pincode && errors.pincode.type === "minLength" && <span>Pincode should be 6 digits</span>}
                    </Error>
                </Label>
                <Label>Order Status
                    <Select {...register("status", { required: true })}>
                        <option value={preloadedData.status}>{preloadedData.status}</option>
                        <option value="Order placed">Order placed</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </Select>
                    <Error>
                        {errors.payment && errors.payment.type === "required" && <span>This is required</span>}
                    </Error>
                </Label>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditOrderForm