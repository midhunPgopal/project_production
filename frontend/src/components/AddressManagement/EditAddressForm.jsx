import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Form = styled.form`
    margin-left: 1.5vw;
`
const Input = styled.input`
    width: 25vw;
    margin: 1vw;
    padding: 1vw;
    font-size: 1.3vw;
    border: 0.1px solid black;
`
const Error = styled.span`
    font-size: 1.2vw;
    padding: .5vw;
    color: #f16969;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonContainer = styled.div`
    margin: 1.2vw;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: white;
  color: teal;
  cursor: pointer;
  font-size: 1.3vw;
  border: 0.1px solid teal;
  &:hover {
    background-color: teal;
    color: white;
  }
`
const Label = styled.label`
    font-weight: 700;
    color: lightgrey;
    font-size: 1.2vw;
`
toast.configure()
const EditCategoryForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector(state => state.user)
    const header = user.currentUser.accessToken
    const userId = user.currentUser.user._id
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = (msg) => {
        toast(msg, {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateAddress = async (data) => {
        const res = await axios.put('/api/address/' + id, data, { headers: { header, userId } })
        notify(res.data.msg)
        navigate('/account')
    }

    return (
        <Form onSubmit={handleSubmit(updateAddress)}>
            <InputContainer>
                <Label>Address
                    <Input id="address" type='text' placeholder='Full address' {...register('address', { required: true })} />
                    <Error>
                        {errors.address && errors.address.type === "required" && <span>This is required</span>}
                    </Error>
                </Label>
                <Label>Pincode
                    <Input id="pincode" type='number' placeholder='pincode code' {...register('pincode', { required: true, minLength: 6, maxLength: 6 })} />
                    <Error>
                        {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                        {errors.pincode && errors.pincode.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.pincode && errors.pincode.type === "minLength" && <span>Min length of 6 required</span>}
                    </Error>
                </Label>
                <Label>Landmark
                    <Input id="landmark" type='text' placeholder='Landmark(optional)' {...register('landmark')} />
                </Label>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditCategoryForm