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
toast.configure()
const EditCategoryForm = ({ preloadedData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken
    const id = location.pathname.split('/')[2]

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedData
    })

    const notify = () => {
        toast('Category updated', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }

    const updateCategory = async (data) => {
        const formData = new FormData()
        formData.append('img', data.picture[0])
        formData.append('category', data.category)

        await axios.put('/api/categories/' + id, formData, { headers: { header } })
        notify()
        navigate('/admin')
    }

    return (
        <Form onSubmit={handleSubmit(updateCategory)}>
            <InputContainer>
                <Input id="category" type='text' placeholder='Category' {...register('category', { required: true })} />
                <Error>
                    {errors.category && errors.category.type === "required" && <span>This is required</span>}
                </Error>
                <Input id="picture" type='file' {...register('picture')} />
            </InputContainer>
            <ButtonContainer>
                <ButtonSubmit type='submit'>Update</ButtonSubmit>
            </ButtonContainer>
        </Form>
    )
}

export default EditCategoryForm