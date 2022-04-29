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
const EditProductForm = ({ preloadedData }) => {

  const navigate = useNavigate()
  const location = useLocation()

  const admin = useSelector(state => state.admin)
  const header = admin.currentAdmin.accessToken
  const id = location.pathname.split('/')[2]

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: preloadedData
  })

  const notify = () => {
    toast('Produt details updated', {
      position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    });
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('img', data.picture[0])
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('author', data.author)
    formData.append('publisher', data.publisher)
    formData.append('publishedAt', data.publishedAt)
    formData.append('category', data.category)
    formData.append('chapter', data.chapter)
    formData.append('price', data.price)
    formData.append('offer', data.offer)

    await axios.put('/api/products/' + id, formData, { headers: { header } })
    notify()
    navigate('/admin')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input id="title" type='text' placeholder='Title' {...register('title', { required: true })} />
        <Error>
          {errors.title && errors.title.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="description" type='text' placeholder='About the book' {...register('description', { required: true })} />
        <Error>
          {errors.description && errors.description.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="author" type='text' placeholder='Author' {...register('author', { required: true })} />
        <Error>
          {errors.author && errors.author.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="publisher" type='text' placeholder='Publisher' {...register('publisher', { required: true })} />
        <Error>
          {errors.publisher && errors.publisher.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="publishedAt" type='date' placeholder='Published on' {...register('publishedAt', { required: true })} />
        <Error>
          {errors.publishedAt && errors.publishedAt.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="picture" type='file' {...register('picture')} />
        <Input id="category" type='text' placeholder='Separate the categories by a coma' {...register('category', { required: true })} />
        <Error>
          {errors.category && errors.category.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="chapter" type='text' placeholder='Separate the chapters by a coma' {...register('chapter', { required: true })} />
        <Error>
          {errors.chapter && errors.chapter.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="price" type='number' placeholder='Selling Price' {...register('price', { required: true })} />
        <Error>
          {errors.price && errors.price.type === "required" && <span>This is required</span>}
        </Error>
        <Input id="offer" type='text' placeholder='Offers' {...register('offer', { required: false })} />
      </InputContainer>
      <ButtonContainer>
        <ButtonSubmit type='submit'>Update</ButtonSubmit>
      </ButtonContainer>
    </Form>
  )
}

export default EditProductForm