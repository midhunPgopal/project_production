import { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { mobile } from '../../responsive'
import ErrorNotice from '../../error/ErrorNotice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
        url('https://wallpapercave.com/wp/wp2036907.jpg') center;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 40%;
    height: 100%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '75%', padding: '5px' })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    ${mobile({ fontSize: '15px' })}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    ${mobile({ flexDirection: 'column' })}
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 10px 0px 0px;
    padding: 10px;
    ${mobile({ padding: '2px', margin: '5px 8px 0px 0px', fontSize: '10px' })}
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Agreement = styled.span`
    font-size: 14px;
    margin: 20px 0px;
    ${mobile({ fontSize: '8px' })}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    ${mobile({ padding: '5px', fontSize: '10px' })}
`
const Error = styled.span`
    font-size: 14px;
    padding: 5px;
    color: #f16969;
`
const Links = styled.a`
    margin: 10px px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
`
toast.configure()
const Register = () => {

    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [errUser, setErrUser] = useState()
    const [errUsername, setErrUsername] = useState()
    const [errPassword, setErrPassword] = useState()

    const notify = () => toast.success('Your details have been stored', {
        position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const onSubmit = async (data) => {
        setErrUser()
        setErrPassword()
        setErrUsername()
        try {
            await axios.post('/api/auth/register', data)
            notify()
            navigate('/login')
        } catch (error) {
            error.response.data.user && setErrUser(error.response.data.user)
            error.response.data.username && setErrUsername(error.response.data.username)
            error.response.data.password && setErrPassword(error.response.data.password)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>Create an Account</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>Name</Label>
                    <Input id="name" type='text' placeholder='Name' {...register('name', { required: true, maxLength: 30, minLength: 3 })} />
                    <Error>
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Min length of 3 required</span>}
                    </Error>
                    <Label>Username</Label>
                    <Input id="username" placeholder='Username' {...register('username', { required: true, maxLength: 30, minLength: 3 })} />
                    <Error>
                        {errors.username && errors.username.type === "required" && <span>This is required</span>}
                        {errors.username && errors.username.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.username && errors.username.type === "minLength" && <span>Min length of 3 required</span>}
                        {errUsername && <ErrorNotice message={errUsername} />}
                    </Error>
                    <Label>Email</Label>
                    <Input id="email" placeholder='Email' {...register('email', {
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })} />
                    <Error>
                        {errors.email && errors.email.type === "required" && <span>This is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                        {errUser && <ErrorNotice message={errUser} />}
                    </Error>
                    <Label>Mobile number</Label>
                    <Input id="mobile" type='number' placeholder='Mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                    <Error>
                        {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                        {errors.mobile && errors.mobile.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.mobile && errors.mobile.type === "minLength" && <span>Min length of 10 required</span>}
                    </Error>
                    <Label>Password</Label>
                    <Input id="password" type='password' placeholder='Password' {...register('password', { required: true, maxLength: 10, minLength: 6 })} />
                    <Error>
                        {errors.password && errors.password.type === "required" && <span>This is required</span>}
                        {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.password && errors.password.type === "minLength" && <span>Min length of 6 required</span>}
                    </Error>
                    <Label>Confirm Password</Label>
                    <Input id="cpassword" type='text' placeholder='Confirm password' {...register('cpassword', { required: true, maxLength: 10, minLength: 6 })} />
                    <Error>
                        {errors.password && errors.password.type === "required" && <span>This is required</span>}
                        {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
                        {errors.password && errors.password.type === "minLength" && <span>Min length of 6 required</span>}
                        {errPassword && <ErrorNotice message={errPassword} />}
                    </Error>
                    <Label>Referal Code</Label>
                    <Input id="referal" type='text' placeholder='Referal code(optional) ' {...register('referal')} />
                    <Agreement>By creating an account, I consent to the processing
                        of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Bottom>
                        <Button type='submit'>CREATE</Button>
                        <Link to='/login'>
                            <Links>Already have an account</Links>
                        </Link>
                    </Bottom>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register