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
const EditUserForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })
    
    const notify = () => {
        toast('User updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateOrder = async (data) => {
        await axios.put('/api/users/' + id, data, { headers: { header } })
        notify()
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateOrder)}>
            <InputContainer>
                <Label>Name</Label>
                <Input id="name" type='text' placeholder='Name' {...register('name', { required: true, maxLength: 15, minLength: 3 })} />
                <Error>
                    {errors.name && errors.name.type === "required" && <span>This is required</span>}
                    {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                    {errors.name && errors.name.type === "minLength" && <span>Min length of 3 required</span>}
                </Error>
                <Label>Email</Label>
                <Input id="email" placeholder='Email' {...register('email', {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} />
                <Error>
                    {errors.email && errors.email.type === "required" && <span>This is required</span>}
                    {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                </Error>
                <Label>Mobile</Label>
                <Input id="mobile" type='number' placeholder='Mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                <Error>
                    {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                    {errors.mobile && errors.mobile.type === "maxLength" && <span>Mobile number should be 10 digits</span>}
                    {errors.mobile && errors.mobile.type === "minLength" && <span>Mobile number should be 10 digits</span>}
                </Error>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditUserForm