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
const EditCouponForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = (msg) => {
        toast(msg, {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateCoupon = async (data) => {
        const res = await axios.put('/api/coupon/' + id, data, { headers: { header } })
        notify(res.data.msg)
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateCoupon)}>
            <InputContainer>
                <Label>Coupon code
                    <Input id="couponCode" type='text' placeholder='Coupon code' {...register('couponCode', { required: true })} />
                </Label>
                <Error>
                    {errors.couponCode && errors.couponCode.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Coupon discount
                    <Input id="discount" type='number' step='0.01' placeholder='Coupon discount' {...register('discount', { required: true })} />
                </Label>
                <Error>
                    {errors.discount && errors.discount.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Coupon maximum
                    <Input id="maximumOfffer" type='number' placeholder='Coupon maximum discount' {...register('maximumOfffer', { required: true })} />
                </Label>
                <Error>
                    {errors.maximumOfffer && errors.maximumOfffer.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Coupon expiry
                    <Input id="expiry" type='date' placeholder='Coupon expiry date' {...register('expiry', { required: true })} />
                </Label>
                <Error>
                    {errors.expiry && errors.expiry.type === "required" && <span>This is required</span>}
                </Error>
                <Label>Coupon minimum amount
                    <Input id="minimumAmount" type='number' placeholder='Coupon minimum amount' {...register('minimumAmount', { required: true })} />
                </Label>
                <Error>
                    {errors.minimumAmount && errors.minimumAmount.type === "required" && <span>This is required</span>}
                </Error>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditCouponForm