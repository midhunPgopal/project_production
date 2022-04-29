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
const EditBannerForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = () => {
        toast('Announcement updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateBanner = async (data) => {
        await axios.put('/api/announcement/' + id, data, { headers: { header } })
        notify()
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateBanner)}>
            <InputContainer>
                <Label>Announcement
                    <Input id="announcement" type='text' placeholder='Announcement' {...register('announcement', { required: true })} />
                    <Error>
                        {errors.announcement && errors.announcement.type === "required" && <span>This is required</span>}
                    </Error>
                </Label>
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditBannerForm