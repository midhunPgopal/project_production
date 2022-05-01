import { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { mobile } from '../../responsive'
import ErrorNotice from '../../error/ErrorNotice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 60vw;
    padding: 1.2vw;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
        url('https://wallpapercave.com/wp/wp2036907.jpg') center;
    background-size: cover;
    ${mobile({ height: '100vh' })}
`
const Wrapper = styled.div`
    width: 50vw;
    padding: 1.2vw;
    background-color: white;
`
const Title = styled.h1`
    font-size: 3vw;
    font-weight: 300;
    text-align: center;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Input = styled.input`
    margin: 1vw 0;
    padding: 1vw;
    font-size: 1.4vw;
    width: 100%;
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Agreement = styled.span`
    font-size: 1.4vw;
    margin: 1.2vw 0;
`
const Button = styled.button`
    width: 20vw;
    border: none;
    padding: 1vw 0.5vw;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 1vw;
    font-size: 1.4vw;
    &:hover {
        color: teal;
        background-color: white;
        border: 0.1px solid teal;
    }
`
const Links = styled.span`
    margin: 0.5vw 0;
    font-size: 1.2vw;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    font-size: 1.1vw;
    padding: 5px;
    color: #f16969;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
    font-size: 1.2vw;
    display: flex;
    flex-direction: column;
    margin: 0 2vw 0 2vw;
`
const PasswordInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
toast.configure()
const Register = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [errUser, setErrUser] = useState()
    const [errUsername, setErrUsername] = useState()
    const [errPassword, setErrPassword] = useState()
    const [passShow, setPassShow] = useState(false)
    const [cpassShow, setCPassShow] = useState(false)

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
                    <InputGroup>
                        <Label>Name
                            <Input id="name" type='text' placeholder='Name' {...register('name', { required: true, maxLength: 30, minLength: 3 })} />
                            <Error>
                                {errors.name && errors.name.type === "required" && <span>This is required</span>}
                                {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.name && errors.name.type === "minLength" && <span>Min length of 3 required</span>}
                            </Error>
                        </Label>
                        <Label>Username
                            <Input id="username" placeholder='Username' {...register('username', { required: true, maxLength: 30, minLength: 3 })} />
                            <Error>
                                {errors.username && errors.username.type === "required" && <span>This is required</span>}
                                {errors.username && errors.username.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.username && errors.username.type === "minLength" && <span>Min length of 3 required</span>}
                                {errUsername && <ErrorNotice message={errUsername} />}
                            </Error>
                        </Label>
                    </InputGroup>
                    <InputGroup>
                        <Label>Email
                            <Input id="email" placeholder='Email' {...register('email', {
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })} />
                            <Error>
                                {errors.email && errors.email.type === "required" && <span>This is required</span>}
                                {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                                {errUser && <ErrorNotice message={errUser} />}
                            </Error>
                        </Label>
                        <Label>Mobile number
                            <Input id="mobile" type='number' placeholder='Mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                            <Error>
                                {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                                {errors.mobile && errors.mobile.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.mobile && errors.mobile.type === "minLength" && <span>Min length of 10 required</span>}
                            </Error>
                        </Label>
                    </InputGroup>
                    <InputGroup>
                        <Label>Password
                            <PasswordInput>
                                <Input id="password" type={passShow ? 'text' : 'password'} placeholder='Password' {...register('password', { required: true, maxLength: 10, minLength: 4 })} />
                                <VisibilityIcon
                                    style={{ fontSize: '2vw', margin: '1vw', cursor: 'pointer' }}
                                    onClick={() => setPassShow(!passShow)}
                                />
                            </PasswordInput>
                            <Error>
                                {errors.password && errors.password.type === "required" && <span>This is required</span>}
                                {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.password && errors.password.type === "minLength" && <span>Min length of 4 required</span>}
                            </Error>
                        </Label>
                        <Label>Confirm Password
                            <PasswordInput>
                                <Input id="cpassword" type={cpassShow ? 'text' : 'password'} placeholder='Confirm password' {...register('cpassword', { required: true, maxLength: 10, minLength: 4 })} />
                                <VisibilityIcon
                                    style={{ fontSize: '2vw', margin: '1vw', cursor: 'pointer' }}
                                    onClick={() => setCPassShow(!cpassShow)}
                                />
                            </PasswordInput>
                            <Error>
                                {errors.password && errors.password.type === "required" && <span>This is required</span>}
                                {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.password && errors.password.type === "minLength" && <span>Min length of 4 required</span>}
                                {errPassword && <ErrorNotice message={errPassword} />}
                            </Error>
                        </Label>
                    </InputGroup>
                    <InputGroup>
                        <Label>Referal Code
                            <Input id="referal" type='text' placeholder='Referal code(optional) ' {...register('referal')} />
                        </Label>
                    </InputGroup>
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